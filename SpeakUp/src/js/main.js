function validateEmail(email)
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function deleteThread(id)
{
    $.ajax({
        type: "POST",
        url: '/thread/'+id+'/delete',
        data: {
            delete: 1
        },
        beforeSend: function() {
            swal.fire({
                html: '<h5>Please Wait</h5>',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                  },
            });
        },
        success: function(data)
        {
            var data = JSON.parse(data);
            if (data.error == 0) {
                window.location.replace('/');
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: data.msg
                  })
            }
        }
    });

}
$(document).ready(function() {

    $('#login').click(function() {
        if(validateEmail($("#email").val()) == false)
        {
            Swal.fire({
                icon: 'error',
                title: 'Please input your email'
              })
            return;
        }
        if($("#password").val().length == 0)
        {
            Swal.fire({
                icon: 'error',
                title: 'Please input your password'
              })
            return;
        }
        
        $.ajax({
            type: "POST",
            url: '/login',
            data: {
                email: $("#email").val(),
                password: $("#password").val()
            },
            beforeSend: function() {
                swal.fire({
                    html: '<h5>Please Wait</h5>',
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading()
                      },
                });
            },
            success: function(data)
            {
                var data = JSON.parse(data);
                if (data.error == 0) {
                    window.location.replace('/');
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: data.msg
                      })
                }
            }
        });

    });
    $('#register').click(function() {
        if(validateEmail($("#email").val()) == false)
        {
            Swal.fire({
                icon: 'error',
                title: 'invalid email'
              })
            return;
        }
        if($("#password1").val().length == 0)
        {
            Swal.fire({
                icon: 'error',
                title: 'Please input your password'
              })
            return;
        }
        if($("#password1").val() != $("#password2").val())
        {
            Swal.fire({
                icon: 'error',
                title: 'Password confirmation not match'
              })
            return;
        }
        $.ajax({
            type: "POST",
            url: '/register',
            data: {
                email: $("#email").val(),
                password: $("#password1").val()
            },
            beforeSend: function() {
                swal.fire({
                    html: '<h5>Please Wait</h5>',
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading()
                      },
                });
            },
            success: function(data)
            {
                var data = JSON.parse(data);
                if (data.error == 0) {
                    window.location.replace('/');
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: data.msg
                      })
                }
            }
        });

    });
    
    $('#postThread').click(function() {
        var title = $("#title").val();
        var subForum = $("#subForum").val();
        var content = $('#content').val();
        if(title.length == 0 || subForum.length == 0 || content.length == 0)
        {
            Swal.fire({
                icon: 'error',
                title: 'All fields are required'
              })
              return;
        }
        $.ajax({
            type: "POST",
            url: '/thread/new/add',
            data: {
                title: $("#title").val(),
                subForum: $("#subForum").val(),
                content: $("#content").val(),
                urlImage: $("#urlImage").val()
            },
            beforeSend: function() {
                swal.fire({
                    html: '<h5>Please Wait</h5>',
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading()
                      },
                });
            },
            success: function(data)
            {
                var data = JSON.parse(data);
                if (data.error == 0) {
                    window.location.replace('/');
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: data.msg
                      })
                }
            }
        });

    });


    $('#postContact').click(function() {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $('#phone').val();
        var message = $('#message').val();
        if(validateEmail($("#email").val()) == false)
        {
            Swal.fire({
                icon: 'error',
                title: 'Please input your email'
              })
            return;
        }
        if(name.length == 0 || email.length == 0 || phone.length == 0 || message.length == 0)
        {
            Swal.fire({
                icon: 'error',
                title: 'All fields are required'
              })
              return;
        }
        $.ajax({
            type: "POST",
            url: '/contact/add',
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                message: $("#message").val()
            },
            beforeSend: function() {
                swal.fire({
                    html: '<h5>Please Wait</h5>',
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading()
                      },
                });
            },
            success: function(data)
            {
                var data = JSON.parse(data);
                if (data.error == 0) {
                    window.location.replace('/');
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: data.msg
                      })
                }
            }
        });

    });



});