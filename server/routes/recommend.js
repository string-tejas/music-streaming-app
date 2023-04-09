const router = require("express").Router();
const { spawn } = require("child_process");

router.get("/:name", async (req, res) => {
    const name = req.params.name;
    let dataToSend;
    const python = spawn("python", ["from_db_recommend.py", name]);

    python.stdout.on("data", function (data) {
        dataToSend = data.toString();
    });

    python.on("close", () => {
        const recommend = JSON.parse(dataToSend);
        res.json(recommend);
    });
});

module.exports = router;
