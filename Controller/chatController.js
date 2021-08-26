exports.chatWindow = function (req, res) {
    var name = req.query.username;
    var room = req.query.room;
    res.render('chat', {
        name: name,
        room: room
    });
}