// Start drawing the pie chart
const img = new Image();
img.src = "./cookie2.png";
img.onload = function () {
	// Start drawing the pie chart when the image is loaded
	animatePieChart();
};

const canvas = document.getElementById("pieChart");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

function drawPieSlice(
	ctx,
	centerX,
	centerY,
	radius,
	startAngle,
	endAngle,
	pattern,
	isShadow
) {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(centerX, centerY);
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.closePath();

	if (isShadow) {
		ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
	}

	ctx.clip();

	if (pattern) {
		const imgWidth = img.width;
		const imgHeight = img.height;
		const x = centerX - imgWidth / 2;
		const y = centerY - imgHeight / 2;
		ctx.fillStyle = pattern;
		ctx.fillRect(x, y, imgWidth, imgHeight);
	}

	ctx.restore();
}

function getCurrentTimePercentage() {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	const milliseconds = now.getMilliseconds();
	const twelveHour =
		(hours % 12) + minutes / 60 + seconds / 3600 + milliseconds / 3600000;
	const percentage = 1 - twelveHour / 12;
	return percentage;
}

function updatePieChart() {
	drawPieChart(getCurrentTimePercentage());
	requestAnimationFrame(updatePieChart);
}

function drawPieChart(animatedPercentage) {
	const percentage = getCurrentTimePercentage();

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw background slice
	// drawPieSlice(
	// 	ctx,
	// 	canvas.width / 2,
	// 	canvas.height / 2,
	// 	150,
	// 	-0.5 * Math.PI,
	// 	1.5 * Math.PI,
	// 	"#e0"
	// );

	// Draw filled slice based on time, only if percentage is not 0
	if (animatedPercentage !== 0) {
		const startAngle = 1.5 * Math.PI - animatedPercentage * 2 * Math.PI;
		const pattern = ctx.createPattern(img, "repeat");
		drawPieSlice(
			ctx,
			canvas.width / 2,
			canvas.height / 2,
			150,
			startAngle,
			1.5 * Math.PI,
			pattern
		);
	}
}

function animatePieChart() {
	const animationDuration = 1; // Animation duration in seconds
	const animatedPercentage = { value: 1 };

	gsap.to(animatedPercentage, {
		value: getCurrentTimePercentage(),
		duration: animationDuration,
		ease: "power1.out",
		onUpdate: () => drawPieChart(animatedPercentage.value),
		onComplete: updatePieChart,
	});
}
