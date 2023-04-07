// colors that go well with white text
const colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#ee82ee", "#ff0000", "#ff7f00"];

export const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

export default colors;
