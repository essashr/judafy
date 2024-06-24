	const cardesContainer = document.querySelector(".cardes");
	const cardesContainerInner = document.querySelector(".cardes__inner");
	const cardes = Array.from(document.querySelectorAll(".carde"));
	const overlay = document.querySelector(".overlay");
	
	const applyOverlayMask = (e) => {
  	const overlayEl = e.currentTarget;
  	const x = e.pageX - cardesContainer.offsetLeft;
  	const y = e.pageY - cardesContainer.offsetTop;

  	overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
	};
	
	const createOverlayCta = (overlayCard, ctaEl) => {
  		const overlayCta = document.createElement("div");
  		overlayCta.classList.add("cta");
  		overlayCta.textContent = ctaEl.textContent;
  		overlayCta.setAttribute("aria-hidden", true);
  		overlayCard.append(overlayCta);
	};

	const observer = new ResizeObserver((entries) => {
  		entries.forEach((entry) => {
    		const cardeIndex = cardes.indexOf(entry.target);
    		let width = entry.borderBoxSize[0].inlineSize;
    		let height = entry.borderBoxSize[0].blockSize;

    		if (cardeIndex >= 0) {
      			overlay.children[cardeIndex].style.width = `${width}px`;
      			overlay.children[cardeIndex].style.height = `${height}px`;
    		}
  		});
	});

	const initOverlayCard = (cardeEl) => {
  		const overlayCard = document.createElement("div");
 		overlayCard.classList.add("carde");
		createOverlayCta(overlayCard, cardeEl.lastElementChild);
		overlay.append(overlayCard);
		observer.observe(cardeEl);
	};

	cardes.forEach(initOverlayCard);
	document.body.addEventListener("pointermove", applyOverlayMask);
