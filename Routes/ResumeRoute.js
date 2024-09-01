const express =require("express")
const router= express.Router();
const Resume=require("../Model/Resume");
const multer = require('multer');
const path = require('path');

// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/', upload.single('photo'), (req, res) => {
    const { name, qualification, experience, details } = req.body;
    
    const photo = req.file ? req.file.path : '';

    const newResume = new Resume({ name, qualification, experience, details,photo });
    newResume.save()
        .then(() => res.json({ message: 'Resume created successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// API route to get all resumes
router.get('/', (req, res) => {
    Resume.find()
        .then(resumes => res.json(resumes))
        .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/:id', (req, res) => {
    Resume.findById(req.params.id)
        .then(resume => {
            if (!resume) {
                return res.status(404).json({ error: 'Resume not found' });
            }
            res.json(resume);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});
// Serve static files
router.use('/uploads', express.static('uploads'));
module.exports=router;