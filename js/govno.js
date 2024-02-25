const cars = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Fisker",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lucid",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mercury",
  "MG",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Polestar",
  "Pontiac",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Saab",
  "Saturn",
  "Scion",
  "Skoda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

const marksUrl = "https://api.auto.ria.com/categories/1/marks/";

async function getModelsByMake(modelId) {
  const res = await fetch(marksUrl + modelId + "/models");
  const models = await res.json();

  return models;
}

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(marksUrl);
  const data = await res.json();
  let html = ``;
  const presentCars = [];
  data.forEach((car) => {
    if (cars.includes(car.name)) {
      presentCars.push(car.name);
      html += `<option value="${car.value}">${car.name}</option>`;
    }
  });
  console.log(
    html,
    cars.filter((car) => !presentCars.includes(car))
  );
});
