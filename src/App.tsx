import CatCalculator from "./components/CatCalculator";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-sky-200">
        <Header />
        <div className="mx-3 mt-10 flex h-full flex-col justify-center">
          <CatCalculator />
        </div>
      </div>
    </>
  );
}

export default App;
