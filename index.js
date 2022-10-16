const form = document.querySelector('form');
const namesInput = form.elements['names'];
const emailInput = form.elements['email'];
const phoneInput = form.elements['phone'];
const addressInput = form.elements['address'];

const contactsWrapper = document.querySelector('.contacts-wrapper');
const contactDetails = document.querySelector('.contact-details');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const contact = {
    names: namesInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
  };

  let newContacts = [];
  const allContacts = localStorage.getItem('contacts');
  if (allContacts) {
    newContacts = JSON.parse(allContacts);
    newContacts.push(contact);
  } else {
    newContacts.push(contact);
  }
  localStorage.setItem('contacts', JSON.stringify(newContacts));
  displayContacts();
});

const displayContacts = () => {
  let contactsTemplate = '';
  const allContacts = JSON.parse(localStorage.getItem('contacts'));
  if (allContacts?.length < 1) {
    contactsWrapper.innerHTML = '<h3>No Contacts Yet</h3>';
  } else {
    allContacts?.forEach((contact, index) => {
      contactsTemplate += `
      <div class="contact" onclick="displayContactDetails(${index})" id=contact-${index}>
          <div class="avatar-names">
            <div class="avatar">
              ${contact.names.charAt(0)}
            </div>
            <div class="names-phone">
              <p class="names">${contact.names}</p>
              <p class="phone">${contact.phone}</p>
            </div>
          </div>
          <div class="actions" onclick="deleteContact(${index})">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>`;
    });
    contactsWrapper.innerHTML = contactsTemplate;
    updateCounter();
    form.reset();
  }
};

const deleteContact = (index) => {
  const allContacts = JSON.parse(localStorage.getItem('contacts'));
  const newcontacts = allContacts.filter((contact, i) => i != index);
  localStorage.setItem('contacts', JSON.stringify(newcontacts));
  displayContacts();
  updateCounter();
};

const displayContactDetails = (index) => {
  // Remove Active class to all other elements
  const contacts = document.querySelectorAll('.contact');
  contacts?.forEach((contact) => {
    contact.classList.remove('active');
  });

  // Add active class to current contact

  document.getElementById(`contact-${index}`).classList.add('active');

  // Display Contact details
  const allContacts = JSON.parse(localStorage.getItem('contacts'));
  const contactToDisplay = allContacts[index];
  const { names, email, phone, address } = contactToDisplay;
  contactDetails.innerHTML = `
  <div class="contact-item">
        <span> <i class="fa-solid fa-user"></i></span>
        <p>${names}</p>
      </div>
      <div class="contact-item">
        <span><i class="fa-solid fa-phone"></i></span>
        <p>${phone}</p>
      </div>
      <div class="contact-item">
        <span><i class="fa-solid fa-envelope"></i></span>
        <p>${email}</p>
      </div>
      <div class="contact-item">
        <span> <i class="fa-solid fa-location-dot"></i></span>
        <p>${address}</p>
      </div>`;
};

const updateCounter = () => {
  const allContacts = JSON.parse(localStorage.getItem('contacts'));
  document.getElementById('counter').textContent = `${allContacts?.length}`;
};
