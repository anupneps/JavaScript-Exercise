/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */

const printNum = () => {
  for (let i = 0; i <= 100; i++) {
    setTimeout(() => {
      console.log(i);
    });
  }
};
printNum();

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] . 
You only need to produce the same array as expected result, no need to consider other 
possibility.
 */

let myArr = [
  "12-24-2014",
  "09-2022-23",
  "12-30-2021",
  "08-02-2021",
  "07-15-2018",
  "2019-12-14",
  "2022-14-12",
];

const fixDate = (array) => {
  const formattedArray = array.map((element) => {
    let splitEl = element.split("-");
    splitEl.sort((a, b) => parseInt(a, 10) - parseInt(b, 10)); // a>0 --> sort a afer b, a<0 --> sort a before b
    return `${splitEl[1]}-${splitEl[0]}-${splitEl[2]}`;
  });
  return formattedArray;
};

let newArr = fixDate(myArr);
console.log(newArr);

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000);
const dateTo = new Date(1000000000);
const counter = (from, to) => {
  /* provide your code here */
  const seconds = (to - from) / 1000;
  const days = Math.floor(seconds / 3600 / 24);
  const hours = Math.floor(seconds / 3600) % 24;
  const minutes = Math.floor(seconds / 60) % 60;
  const second = Math.floor(seconds % 60);

  return `${days} days - ${hours} hours - ${minutes} minutes - ${second} seconds`;
};
const timer = counter(dateFrom, dateTo);
console.log(timer);

/* 
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/

const btn = document.getElementById("searchBtn");
const countryInfo = document.getElementById("countryInfo");
const countryList = document.getElementById("countryList");
const searchInput = document.getElementById("input");

btn.addEventListener("click", () => {
  const countryName = searchInput.value;
  if (countryName === "") {
    throw "Invalid country Name";
  }
  getSingleCountry(countryName);
  countryInfo.style.display = "block";
});

const getAllCountries = () => {
  /* provide your code here */
  fetch("https://restcountries.com/v2/all")
    .then((response) => response.json())
    .then((data) => displayCountryName(data));
};

const getSingleCountry = (country) => {
  /* provide your code here */
  fetch("https://restcountries.com/v2/name/" + country)
    .then((response) => response.json())
    .then((data) => displaySingleCountry(data));
};

const displayCountryName = (data) => {
  data.map((item) => {
    const countryEl = document.createElement("div");
    countryList.appendChild(countryEl);
    countryEl.classList = "countryCard";
    countryEl.innerHTML = `
                <img src=${item.flags.svg} alt="flag-image" class="flag" />
                <div class="countryCardDetail">
                    <h2>${item.name}</h2>
                    <p>Capital: ${item.capital}</p>
                    <p>Population: ${item.population}</p>
                    <p>Region: ${item.region}</p>
                </div>
            `;
    return item;
  });
};

const displaySingleCountry = (item) => {
  const countryDetail = document.createElement("div");
  countryInfo.appendChild(countryDetail);
  countryDetail.classList = "cardDiv";
  countryDetail.innerHTML = `
  <div class = "countryDetail">
  <h2> ${item[0].name}</h2>
  <p>Capital:  ${item[0].capital}</p>
  <p>Population: ${item[0].population}</p>
  <p>Region: ${item[0].region}</p>
  </div>
  <div>
  <img src= ${item[0].flag} alt="" class="flag" />
  </div>
`;
};

getAllCountries();

/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

const generateNewFolderName = (existingFolders) => {
  let inputFolder = "New Folder";
  if (
    existingFolders.includes(inputFolder) ||
    existingFolders.includes(`${inputFolder} (${existingFolders.length})`)
  ) {
    return existingFolders.push(`${inputFolder} (${existingFolders.length})`);
  } else {
    return existingFolders.push(inputFolder);
  }
};

let folder = [];
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']

/* 
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) and profit (private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the price with a certain amount 
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook: 
- inherit Book, but have 1 more private parameter in the constructor: taxRate. 
- give the logic to calculate price with taxRate. For example: 
cost 14, profit 0.3 , tax 24% => expected price is 30.43
*/
class Book {
  _title;
  _cost;
  _profit;
  _price;
  constructor(title, cost, profit) {
    validateBook(title, cost, profit);
    this._title = title;
    this._cost = cost;
    this._profit = profit;
    this._price = this._cost / (1 - this._profit);
  }
  get price() {
    return this._price;
  }
  get profit() {
    return this._price - this._cost;
  }
  set increasePrice(amount) {
    this._price += amount;
  }
}

const validateBook = (title, cost, profit) => {
  if (typeof title !== "string") {
    throw "Title shoud be string!";
  }
  if (title === "") {
    throw "Title invalid!";
  }
  if (cost < 0) {
    throw "Cost must be positive integer!";
  }
  if (profit < 0 || profit >= 0.5) {
    throw "Profit must be between 0 - 0.5 !";
  }
};

class TaxableBook extends Book {
  constructor(title, cost, profit, taxRate) {
    super(title, cost, profit);
    this.taxRate = taxRate;
    this._price =
      this._cost / (1 - this._profit) + (taxRate / 100) * this._price;
  }
}

const book1 = new Book("The Power of Habits", 14, 0.3);
const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 24);
