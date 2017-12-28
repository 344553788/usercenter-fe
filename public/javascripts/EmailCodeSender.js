//email code
function sendEmail() {
    $('#emailcodeBtn').click(function() {
        function redirect(t) {
            window.setTimeout(function() {
                t--;
                if (t > 0) {
                    redirect(t);
                } else {
                    $('#emailcodeBtn').attr("disabled", false);
                    $('#emailcodeBtn').html('发送验证码');
                }
            }, 1000);

            $('#emailcodeBtn').attr("disabled", true);
            $('#emailcodeBtn').html(t + '秒后...重新发送');
        }

        var emailAddr = $.trim($('#newEmail').val());
        alert(emailAddr);
        if (emailAddr) {
            $.ajax({
                type: 'POST',
                url: '/EmailCode',
                data: {
                    email: emailAddr
                }
            });
        }

        redirect(60);
    });
}