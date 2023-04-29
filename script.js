// Start drawing the pie chart
const img = new Image();
img.src = "./cookie2.png";
img.onload = function () {
	// Start drawing the pie chart when the image is loaded
	drawPieChart();
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

function drawPieChart() {
	const percentage = getCurrentTimePercentage();

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw background slice
	drawPieSlice(
		ctx,
		canvas.width / 2,
		canvas.height / 2,
		150,
		-0.5 * Math.PI,
		1.5 * Math.PI,
		"#fff"
	);

	// Draw filled slice based on time, only if percentage is not 0
	if (percentage !== 0) {
		const startAngle = 1.5 * Math.PI - percentage * 2 * Math.PI;
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

	// Call drawPieChart again in the next animation frame
	requestAnimationFrame(drawPieChart);
}
  
