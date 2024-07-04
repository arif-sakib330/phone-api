const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    // "https://openapi.programming-hero.com/api/phones?search=iphone"
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    //iphone k dianamic korci jate search korle phone golak paite pari
  );

  const data = await res.json();
  const phones = data.data;
  //   console.log(data.data);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  //   console.log(phones);
  //   1.find container where we append
  const phoneContainer = document.getElementById("phone-container");

  //   for clear old search data
  phoneContainer.textContent = ""; //2nd search a ager search ar data clear hbe

  // show all btn when phones are more then 12
  const showAllBtn = document.getElementById("show-button-container");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
    phones = phones.slice(0, 12);
  } else {
    showAllBtn.classList.add("hidden");
  }

  // only display few phone
  // phones = phones.slice(0, 12); //only 12 ta phone search korle show hbe
  // console.log("is show all", isShowAll);
  // if (!showAllBtn) {
  //   phones = phones.slice(0, 12); //show all btn show na hole slice hbe.
  // }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2.create div
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card text-black bg-slate-200 p-4 shadow-xl mt-4";
    // 3.set inner html
    phoneCard.innerHTML = `
                    <figure>
                        <img src="${phone.image}"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>There are many variations of passages of available, but the majority have suffered</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
    `;
    // 4. append
    phoneContainer.appendChild(phoneCard);
  });

  // loading off
  toggleLoadingSpinner(false); // false cz data load hoye gele off hbe loading spring ta. aita akane call korci cz all proccessing hoye data/phone display howar tik age 'L spring' off hbe then display hbe.
};

// handle Show Details
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  // console.log("click", data);
  showPhoneModel(phoneDetails);
};

//
const showPhoneModel = (phone) => {
  // show modal
  console.log(phone);

  const phoneName = document.getElementById("show-phone-details-name");
  phoneName.innerText = phone.name;

  const showDetails = document.getElementById("show-details-id");
  showDetails.innerHTML = `
  <img class="justify-center items-center w-auto" src="${phone.image}" alt="">
  <p><span>Storage : </span>${phone.mainFeatures.storage}</p>
  <p><span>Display Size : </span>${phone.mainFeatures.displaySize}</p>
  <p><span>chipSet: </span>${phone.mainFeatures.chipSet}</p>
  <p><span>Ram : </span>${phone.mainFeatures.memory}</p>
  <p><span>GPS : </span>${phone.others?.GPS ? phone.others.GPS : "No GPS"}</p>
  <p><span>Slug : </span>${phone.slug}</p>
  <p><span>Brand : </span>${phone.brand}</p> 
  <p><span>Release Date : </span>${
    phone.others?.releaseDate || "Release Date not available"
  }</p>
  `;
  show_details_modal.showModal();
};

// search handle
const HandleSearch = (isShowAll) => {
  const inputField = document.getElementById("inputField");
  const inputText = inputField.value;
  //   console.log(inputText);

  toggleLoadingSpinner(true); // ata loadPhone ar age call korci cz load ta kaj korbe inputtex(phone) pawar age. perameter true disi cz loading ta hocce
  loadPhone(inputText, isShowAll);
};

// loading-spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// Show All btn
const handleShowAllBtn = () => {
  HandleSearch(true);
};

// loadPhone();
