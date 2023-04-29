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
	pattern
) {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(centerX, centerY);
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.closePath();
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

	// If it's exactly 12 AM or 12 PM, return 0 (empty chart)
	if ((hours === 0 || hours === 12) && minutes === 0) {
		return 0;
	}

	const adjustedHours = hours % 12;
	const totalMinutes = adjustedHours * 60 + minutes;
	return totalMinutes / 720;
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
		null
	);

	// Draw filled slice based on time, only if percentage is not 0
	if (percentage !== 0) {
		const endAngle = -0.5 * Math.PI + percentage * 2 * Math.PI;
		const pattern = ctx.createPattern(img, "repeat");
		drawPieSlice(
			ctx,
			canvas.width / 2,
			canvas.height / 2,
			150,
			-0.5 * Math.PI,
			endAngle,
			pattern
		);
	}

	// Call drawPieChart again in the next animation frame
	requestAnimationFrame(drawPieChart);
}
