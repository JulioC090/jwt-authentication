export default function HomePage() {
  const userName = 'Usuário';

  return (
    <div className="min-h-screen bg-gradient-to-t from-violet-900 to-indigo-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bem-vindo, {userName}!
        </h1>
        <p className="text-lg md:text-xl">
          Esperamos que você tenha um ótimo dia.
        </p>
      </div>
    </div>
  );
}
