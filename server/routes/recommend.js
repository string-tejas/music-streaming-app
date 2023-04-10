const router = require("express").Router();
const { spawn } = require("child_process");
const { log } = require("console");

router.get("/:name", async (req, res) => {
    const name = req.params.name;
    let dataToSend;
    const python = spawn("python", ["from_db_recommend.py", name]);

    python.stdout.on("data", function (data) {
        dataToSend = data.toString();
    });

    python.on("close", () => {
        try {
            const recommend = JSON.parse(dataToSend);
            res.json(recommend);
        } catch (e) {
            console.log(e);
            return res.json({ ok: false, msg: "some error occured while recommending" });
        }
    });
});

module.exports = router;
