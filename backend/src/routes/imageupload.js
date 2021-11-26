const express = require('express');
const multer = require('multer');
const path = require('path');
var router = express.Router();
const { pool } = require('../config');

// Create multer object
const imageUpload = multer({
    dest: 'images',
});

router.post('/image', imageUpload.single('image'), async (req, res) => {
    console.log(req.file);
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;

    try {
        var result = await pool.query(`INSERT INTO image_files (filename, filepath, mimetype, size) 
        values ($1, $2, $3, $4)`, 
        [filename, filepath, mimetype, size]);
        return res.json({ message: "Successfully uploaded", filename });
    } catch (err) {
        return res.status(500).json({ error: { message: err.toString() } });
    }

});

router.get('/image/:filename', async (req, res) => {
    const { filename } = req.params;

    try {
        var result = await pool.query(`SELECT * FROM image_files WHERE filename=$1`, [filename]);
        if (result.rows[0]) {
            const dirname = path.resolve();
            const fullfilepath = path.join(dirname, result.rows[0].filepath);
            return res.type(result.rows[0].mimetype).sendFile(fullfilepath);
        }
        return Promise.reject( new Error('Image does not exist'));
    } catch (err) {
        return res.status(500).json({ error: { message: err.toString() } });
    }
});

module.exports = router;