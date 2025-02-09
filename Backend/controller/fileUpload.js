const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file from request
        const file = req.files.file;
        console.log("File received -> ", file);

        //create path where file need to be stored on server
        let path =
            __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH-> ", path);

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success: true,
            message: "Local File Uploaded Successfully",
        });
    } catch (error) {
        console.log("Not able to upload the file on server");
        console.log(error);
    }
};

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

function isLargeFile(fileSize) {
    // converting bytes ito megabytes
    const mbSize = fileSize / (1024 * 1024);
    console.log("filesize is --> ", mbSize);
    return mbSize > 5;
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { 
        folder: folder,
        resource_type: "auto",

        // these 3 lines will help to keep the original filename in the database
        public_id: file.name,
        use_filename: true,
        unique_filename: false
    };

    console.log("temp file path", file.tempFilePath);

    if (quality) {
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// imageUpload handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, handle } = req.body;
        console.log(name, handle);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        //file format is supported
        console.log("Uploading to Cloudinary");
        const response = await uploadFileToCloudinary(file, "userData");
        console.log(response);

        // Save entry in DB
        const fileData = await File.create({
            name,
            handle,
            url: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


exports.fetchUserData = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await File.find({});
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user data",
        });
    }
};
