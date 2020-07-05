const orm = require('./orm');

function router( app ){
    app.get('/api/food/:category?', async function(req, res) {
<<<<<<< HEAD
        const category = req.params.category ? req.params.category : '';
        console.log( `[GET] getting food categories, category=${category}`);
        const listByCategory = await orm.showItem( category );
        console.log( listByCategory )
=======
        const foodCategory = req.params.category;
        console.log( `[GET] getting food categories, category=${foodCategory}`);
        const listByCategory = await orm.showItem( foodCategory );

>>>>>>> Haley
        res.send( listByCategory );
    })

    app.post('/api/food', async function(req, res) {
        console.log( '[POST] we received this data:', req.body )
        const saveResult = await orm.addItem( req.body.item, req.body.category, req.body.quantity, req.body.img_url )
        console.log( `... insertId: ${saveResult.insertId} ` )

        res.send( { status: true, insertId: saveResult.insertId, message: 'Saved successfully' } )
    });

    app.put('/api/food', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.id ) {
            res.status(404).send( { message: 'Invalid id' } )
        }

        const saveResult = await orm.updateItem( req.body.id, req.body.item, req.body.category, req.body.quantity, req.body.img_url )
        console.log( '... ', saveResult )
        res.send( { status: true, message: 'Updated successfully' } )
    });

    app.delete('/api/food/:id', async function(req, res) {
        const taskId = req.params.id
        console.log( `[DELETE] id=${taskId}` )
        const deleteResult = await orm.removeItem( taskId )
        console.log( '... ', deleteResult )

        res.send( { status: true, message: 'Deleted successfully' } )
    });
}

module.exports = router;