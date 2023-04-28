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
	color
) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(centerX, centerY);
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.closePath();
	ctx.fill();
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
		"#e0e0e0"
	);

	// Draw filled slice based on time, only if percentage is not 0
	if (percentage !== 0) {
		const endAngle = -0.5 * Math.PI + percentage * 2 * Math.PI;
		drawPieSlice(
			ctx,
			canvas.width / 2,
			canvas.height / 2,
			150,
			-0.5 * Math.PI,
			endAngle,
			"#4CAF50"
		);
	}

	// Call drawPieChart again in the next animation frame
	requestAnimationFrame(drawPieChart);
}

// Start drawing the pie chart
drawPieChart();
