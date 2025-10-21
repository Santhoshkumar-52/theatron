const db = require('../config/db.js')

// ✅ Duplicate check helper
const checkDuplicate = async (screenName, branchid, type) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const query = `
        SELECT screenName, branchid, type 
        FROM screenmaster 
        WHERE screenName = ? AND branchid = ? AND type = ?
      `;
            db.query(query, [screenName, branchid, type], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
        return result;
    } catch (error) {
        console.error("Error checking duplicate:", error);
        throw error;
    }
};

// ✅ Add New Screen Function
const addnewscreen = async (req, res) => {
    const {
        noOfRows,
        rowChars,
        screenName,
        seatingCapacity,
        seatsPerRow,
        spaceAfterRows,
        spaceAfterSeats,
        type,
        branchid
    } = req.body;

    try {
        // 🔍 Check for duplicate before inserting
        const duplicates = await checkDuplicate(screenName, branchid, type);
        if (duplicates.length > 0) {
            return res.json({
                status: "error",
                swal: {
                    icon: "warning",
                    title: "Duplicate Screen!",
                    text: "A screen with this name already exists for this branch and type."
                }
            });
        }

        // 🧮 Default values
        const query = `
      INSERT INTO screenmaster (
        screenName,
        rowChars,
        noOfRows,
        seatsPerRow,
        seatingCapacity,
        spaceAfterRows,
        spaceAfterSeats,
        type,
        branchid
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            screenName,
            rowChars,
            noOfRows,
            seatsPerRow,
            seatingCapacity,
            spaceAfterRows || 0,
            spaceAfterSeats || 0,
            type,
            branchid
        ];

        // 💾 Insert into database
        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error inserting screen:", err);
                return res.json({
                    status: "error",
                    swal: {
                        icon: "error",
                        title: "Error!",
                        text: "Failed to add screen. Please try again."
                    }
                });
            }

            return res.json({
                status: "success",
                swal: {
                    icon: "success",
                    title: "Screen Added!",
                    text: `${screenName} has been successfully added.`
                }
            });
        });

    } catch (error) {
        console.error("Error in addnewscreen:", error);
        return res.json({
            status: "error",
            swal: {
                icon: "error",
                title: "Server Error!",
                text: "Something went wrong while adding the screen."
            }
        });
    }
};


module.exports = addnewscreen; 