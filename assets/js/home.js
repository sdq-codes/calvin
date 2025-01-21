$(document).ready(function () {
    // Tab click event
    $('.market-tab .item').click(function () {
        // Remove 'active' class from all tabs
        $('.market-tab .item').removeClass('active');

        // Add 'active' class to the clicked tab
        $(this).addClass('active');

        // Get the data-tab value of the clicked tab
        var tab = $(this).data('tab');

        // Hide all content blocks
        $('.tab-content').hide();

        // Show the corresponding content block
        $('#' + tab).show();
    });
});