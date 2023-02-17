$(document).ready(function() {

    // Disable form submission on Enter key press
    $('#transaction-form').on('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        return false;
      }
    });
  
    // Form validation
    $('#transaction-form').on('submit', function(event) {
  
      // Prevent default form submission
      event.preventDefault();
  
      // Disable submit button
      var $submitButton = $('#submit-button');
      $submitButton.prop('disabled', true);
      $submitButton.find('.spinner-border').removeClass('d-none');
  
      // Validate input address
      var $inputAddress = $('#input-address');
      var inputAddress = $inputAddress.val();
      var isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(inputAddress);
      if (!isValidAddress) {
        $inputAddress.addClass('is-invalid');
        $submitButton.prop('disabled', false);
        $submitButton.find('.spinner-border').addClass('d-none');
        return;
      }
  
      // Validate input amount
      var $inputAmount = $('#input-amount');
      var inputAmount = $inputAmount.val();
      if (isNaN(inputAmount) || inputAmount <= 0) {
        $inputAmount.addClass('is-invalid');
        $submitButton.prop('disabled', false);
        $submitButton.find('.spinner-border').addClass('d-none');
        return;
      }
  
      // Validate input OTP
      var $inputOtp = $('#input-otp');
      var inputOtp = $inputOtp.val();
      if (isNaN(inputOtp) || inputOtp.toString().length !== 6) {
        $inputOtp.addClass('is-invalid');
        $submitButton.prop('disabled', false);
        $submitButton.find('.spinner-border').addClass('d-none');
        return;
      }
  
      // Simulate backend processing with timeout delay
      setTimeout(function() {
  
        // Show success message
        var $successAlert = $('<div class="alert alert-success mt-4" role="alert">Transaction successfully sent!</div>');
        $successAlert.hide();
        $('#transaction-form').after($successAlert);
        $successAlert.slideDown();
  
        // Reset form
        $('#transaction-form')[0].reset();
        $('.is-invalid').removeClass('is-invalid');
        $submitButton.prop('disabled', false);
        $submitButton.find('.spinner-border').addClass('d-none');
  
      }, 2000);
  
    });
});