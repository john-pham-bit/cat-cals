import CatCalculator from "./components/CatCalculator";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="h-screen w-screen bg-sky-200">
        <Header />
        <div className="mx-3 mt-10 flex flex-col justify-center">
          <CatCalculator />
        </div>
      </div>
    </>
  );
}

export default App;
