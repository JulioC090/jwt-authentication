import cors from '@fastify/cors';
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

type User = {
  name: string;
  email: string;
  password: string;
};

type Login = {
  email: string;
  password: string;
};

type Blacklist = {
  [key: string]: { token: string; payload: JwtPayload };
};

export interface RequestWithAuthInfo extends FastifyRequest {
  payload: JwtPayload;
  token: string;
}

const users: Array<User> = [];
const SECRET = 'c24fdfdde70947f16f6380f410ae5442ed475e20';
const blacklist: Blacklist = {};

setInterval(() => {
  const now = Date.now();
  Object.keys(blacklist).forEach((item) => {
    const expiration = blacklist[item].payload.exp! * 1000;
    if (expiration < now) {
      delete blacklist[item];
    }
  });
}, 10000);

const app = fastify();

app.register(cors);

const authenticateDecorator = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (!request.headers.authorization) reply.code(401).send();

  const token = request.headers.authorization!.replace('Bearer ', '');
  if (!token) reply.code(401).send();

  jwt.verify(token!, SECRET, (err, payload) => {
    if (err) reply.code(401).send();
    if (blacklist[(payload as JwtPayload).email]) reply.code(401).send();
    (request as RequestWithAuthInfo).payload = payload as JwtPayload;
    (request as RequestWithAuthInfo).token = token;
  });
};

const publicRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/signup', (request, reply) => {
    const { name, email, password } = request.body as User;

    users.push({ name, email, password });

    const token = jwt.sign({ email }, SECRET, { expiresIn: 300 });
    reply.code(201).send({ token });
  });

  fastify.post('/auth', (request, reply) => {
    const { email, password } = request.body as Login;

    const user = users.filter(
      (user) => user.email === email && user.password === password,
    );

    if (user.length === 0) return reply.code(401).send({ auth: false });

    const token = jwt.sign({ email }, SECRET, { expiresIn: 300 });
    reply.code(201).send({ auth: true, token });
  });
};

const privateRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', authenticateDecorator);

  fastify.get('/name', (request, reply) => {
    const user = users.filter(
      (user) => user.email === (request as RequestWithAuthInfo).payload.email,
    );
    reply.code(200).send(user[0].name);
  });

  fastify.post('/logout', (request, reply) => {
    blacklist[(request as RequestWithAuthInfo).payload.email] = {
      token: (request as RequestWithAuthInfo).token,
      payload: (request as RequestWithAuthInfo).payload,
    };
    reply.code(200).send();
  });
};

app.register(publicRoutes);
app.register(privateRoutes);

app.listen({ port: 3000 }, (err, address) => {
  console.log(`Server starting in ${address}`);
});
