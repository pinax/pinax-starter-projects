// Requires <script src="https://js.stripe.com/v3/"></script> to be included in your page

const loadStripeElements = () => {
  const form = document.querySelector('form[data-stripe-key]');
  if (form === null) {
    return;
  }
  const key = form.getAttribute('data-stripe-key');
  if (key) {
    if (Stripe === undefined) {
      throw('pinax-stripe integration requires that https://js.stripe.com/v3/ is loaded in a script tag in your page.');
    }
    const stripe = Stripe(key);
    const elements = stripe.elements();
    const card = elements.create('card');
    const errorElement = document.getElementById(form.getAttribute('data-card-errors-id'));
    card.mount(`#${form.getAttribute('data-card-mount-id')}`);

    card.addEventListener('change', (event) => {
      if (event.error) {
        errorElement.textContent = event.error.message;
      } else {
        errorElement.textContent = '';
      }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      stripe.createToken(card).then((result) => {
        if (result.error) {
          // Inform the user if there was an error
          errorElement.textContent = result.error.message;
        } else {
          const tokenInput = document.createElement('input');
          tokenInput.setAttribute('type', 'hidden');
          tokenInput.setAttribute('name', 'stripeToken');
          tokenInput.setAttribute('value', result.token.id);
          form.appendChild(tokenInput);
          form.submit();
        }
      });
    });
  }
};

export default loadStripeElements;
