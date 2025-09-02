
$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-staff").modal("show");
            },
            success: function (data) {
                $("#modal-staff .modal-content").html(data.html_form);
            }
        });
    };

    var saveForm = function () {
        // e.preventDefault();
        var form = $(this);
        var formdata = false;
        if (window.FormData) {
            formdata = new FormData(form[0]);
        }

        var formAction = form.attr('action');
        // form.append('certificate', $("input[id^=certificate]"));
        // form.append('visa', $("input[id^=visa]"));
        // formData.append("file", $("#certificate")[0].files[0]);
        // formData.append("file", $("#visa")[0].files[0]);
        // formData.append("csrfmiddlewaretoken", $("[name='csrfmiddlewaretoken']").val());

        $.ajax({
            url: form.attr("action"),
            data: formdata ? formdata : form.serialize(),
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                if (data.form_is_valid) {
                    $("#staff-table tbody").html(data.html_book_list);
                    $("#modal-staff").modal("hide");
                    notify('success', 'Action Completed Successfully');

                }
                else {
                    $("#modal-staff .modal-content").html(data.html_form);
                    notify('danger', 'Failed, kindly key in the correct details');
                }
            }
        });
        return false;
    };




    /* Binding */

    // Create book
    $(".js-create-staff").click(loadForm);
    $("#modal-staff").on("submit", ".js-staff-create-form", saveForm);

    // Update book
    $("#staff-table").on("click", ".js-update-staff", loadForm);
    $("#modal-staff").on("submit", ".js-staff-update-form", saveForm);

    $("#staff-table").on("click", ".js-delete-staff", loadForm);
    $("#modal-staff").on("submit", ".js-staff-delete-form", saveForm);
    $("#benefit-table").on("click", ".js-detail-contract", loadForm);
    $("#benefit-table").on("click", ".js-transcript-details", loadForm);

    // Transcripts Add
    // $(".js-create-transcrpit").click(loadForm);
    $("#benefit-table").on("click", ".js-create-transcrpit", loadForm);
    $("#modal-contract").on("submit", ".js-transcript-create-form", saveForm);


});