const Spot = require("../../models/spot");
const Location = require("../../models/location")
const Image = require("../../models/image")

module.exports = async function createSpot({ spotInput }, req) {
    // console.log('SPOT INPUT----', spotInput.location)

    try {
        let createdLocation = new Location ({
            latitude: spotInput.location.latitude,
            longitude: spotInput.location.longitude
        })

        await createdLocation.save();

        let imageIDs = []

        const images = spotInput.images.map(async (i) => {
            const createdImage = new Image ({
                base64: i.base64
            })
            await createdImage.save();
            return createdImage
        })

        Promise.all(images).then(function(values) {
            values.forEach(i => imageIDs.push(i._id))
          });

        console.log(imageIDs);
        


        // let createdSpot = new Spot({
        //     name: spotInput.name,
        //     owner: spotInput.owner,
        //     kickout_level: spotInput.kickout_level,
        //     description: spotInput.description,
        //     location: spotInput.location,
        // });

        // await Building.findOneAndUpdate(
        //     { _id: buildingID },
        //     { $set: { "logo" : logo._id } }
        //   );

        // createdSpot.push('images', spotInput.images)
        // createdSpot.set('location', spotInput.location)

        // console.log(createdSpot)

        // await createdSpot.save();
    }
    catch (e) {
        return new Error(e)
    }
}