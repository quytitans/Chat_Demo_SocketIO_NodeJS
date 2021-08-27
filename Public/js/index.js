$().ready(function() {
    $('#form1').validate({
        rules: {
            "username": {
                required: true,
                minlength:3,
                maxlength: 20
            },
            "room": {
                required: true,
                minlength: 4,
                maxlength: 10
            }
        },
        messages: {
            "username": {
                required: "* username required",
                minlength: "* name must have from 3 character",
                maxlength: "* name must have less than 20 character"
            },
            "room": {
                required: "* Room's name required",
                minlength: "* Room's name must have from 4 character",
                maxlength: "* Room's name must have less than 10 character"
            }
        }
    });
});