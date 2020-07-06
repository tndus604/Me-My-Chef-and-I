const orm = require('./orm');

function router( app ){
    app.get('/api/food/:category?', async function(req, res) {
        const foodCategory = req.params.category;
        console.log( `[GET] getting food categories, category=${foodCategory}`);
        const listByCategory = await orm.showItem( foodCategory );

        res.send( listByCategory );
    })

    app.post('/api/food', async function(req, res) {
        console.log( '[POST] we received this data:', req.body )
        if( !req.body.item ){
            console.log( "sorry no item data found!" )
            res.send( { status: false, message: "No message data found" } )
        }
        const saveResult = await orm.addItem( req.body.category, req.body.item, req.body.quantity, req.body.image_url )

        console.log( `... insertId: ${saveResult.insertId} ` )

        res.send( { status: true, insertId: saveResult.insertId, message: 'Saved successfully' } )
    });

    app.get('/api/food/ingredient/:id', async function(req, res) {
        const foodId = req.params.id;
        console.log(`[GET] putting food into fridge, id=${foodId}`);
        const listById = await orm.moveItem(foodId);

        res.send( listById );
    });

    // app.post('/api/fridge', async function(req, res) {
    //     console.log('[POST] we received this data:', req.body);
    //     const saveResult = await orm.saveFridge(id, category, item, is_rotten, quantity, image_url)

    //     console.log( `... insertId: ${saveResult.insertId} ` )
    //     res.send( { status: true, insertId: saveResult.insertId, message: 'Saved successfully' } )
    // })

    app.delete('/api/food/:id', async function(req, res) {
        const taskId = req.params.id
        console.log( `[DELETE] id=${taskId}` )
        const deleteResult = await orm.removeItem( taskId )
        console.log( '... ', deleteResult )

        res.send( { status: true, message: 'Deleted successfully' } )
    });
}

module.exports = router;