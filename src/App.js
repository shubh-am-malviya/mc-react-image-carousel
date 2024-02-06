import "./App.css";
import ImageCarousel from "./components/ImageCarousel";
import imagesList from "./utils/images";

function App() {
	return (
		<ImageCarousel
			images={imagesList}
			width={"600px"}
			height={"400px"}
			loop
			autoSlide
			autoSlideDuration={3000}
		/>
	);
}

export default App;
