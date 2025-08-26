import MovieList from "@/app/movie-list";

export default function HomePage() {
  return (
    <main
      className="h-full w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/imagens/backgropund-krists-luhaers-unsplash.png')",
      }}
    >
      <div className="w-full mx-auto p-4 flex justify-center bg-mauve-dark-1/80 dark:bg-mauve-dark-alpha-11/90">
        <MovieList />
      </div>
    </main>
  );
}
