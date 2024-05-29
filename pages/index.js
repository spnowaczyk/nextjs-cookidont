import TailwindCheck from '../components/TailwindCheck';

export default function Home() {
  return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <main className="text-center">
          <h1 className="text-3xl font-bold">Welcome to My Web Page</h1>
          <p className="mt-4 text-lg text-gray-700">This is a simple web page created using Tailwind CSS and Next.js</p>
          <TailwindCheck />
        </main>
      </div>
  );
}