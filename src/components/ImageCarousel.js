import React, { useCallback, useEffect, useState } from "react";

const ImageCarousel = ({ images, height, width, loop, autoSlide, autoSlideDuration }) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	const handleSwipe = useCallback(
		(direction) => {
			let newIndex = direction === "left" ? activeImageIndex - 1 : activeImageIndex + 1;
			if (newIndex < 0) {
				newIndex = loop ? images.length - 1 : 0;
			}
			if (newIndex === images.length) {
				newIndex = loop ? 0 : images.length - 1;
			}
			setActiveImageIndex(newIndex);
		},
		[activeImageIndex, images.length, loop]
	);

	// Autoslide logic
	useEffect(() => {
		if (!autoSlide) return;

		const timer = setInterval(() => {
			if (!loop && activeImageIndex + 1 === images.length) clearInterval(timer);
			handleSwipe("right");
		}, autoSlideDuration);

		return () => {
			clearInterval(timer);
		};
	}, [autoSlide, autoSlideDuration, handleSwipe, images.length, activeImageIndex, loop]);

	return (
		<div className="carousel-container">
			<button className="slide-button slide-button-prev" onClick={() => handleSwipe("left")}>
				{"<"}
			</button>
			<button className="slide-button slide-button-next" onClick={() => handleSwipe("right")}>
				{">"}
			</button>
			{images.map((image, index) => (
				<img
					className={`carousel-image ${activeImageIndex === index ? "active-image" : ""}`}
					key={index}
					src={image?.src}
					alt={image?.alt}
					height={height}
					width={width}
					loading="lazy"
				/>
			))}
		</div>
	);
};

export default ImageCarousel;
