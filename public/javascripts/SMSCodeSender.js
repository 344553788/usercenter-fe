
function sendSMS() {
    $('#smscodeBtn').click(function() {
        function redirect(t) {
            window.setTimeout(function() {
                t--;
                if (t > 0) {
                    redirect(t);
                } else {
                    $('#smscodeBtn').attr("disabled", false);
                    $('#smscodeBtn').html('发送验证码');
                }
            }, 1000);

            $('#smscodeBtn').attr("disabled", true);
            $('#smscodeBtn').html(t + '秒后...重新发送');
        }

        var phoneNumber = $.trim($('#smsMobile').val());
        if (phoneNumber) {
            $.ajax({
                type: 'POST',
                url: '/SMSCode',
                data: {
                    to: phoneNumber
                }
            });
        }

        redirect(60);
    });
}