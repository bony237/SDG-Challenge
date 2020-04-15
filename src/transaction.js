import covid19ImpactEstimator from './estimator';


console.log('hello');
const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: '',
  timeToElapse: 0,
  reportedCases: 0,
  population: 0,
  totalHospitalBeds: 0
};

const theForm = document.getElementsByTagName('form');
const theInputs = document.querySelectorAll('input');
const periodTypeInput = document.querySelector('select');
const allImpactsFields = document.querySelector('tbody tr');

theForm.addEventListener('submit', () => {
  // rescue data
  data.periodType = periodTypeInput.value;
  data.timeToElapse = theInputs[0].value;
  data.reportedCases = theInputs[2].value;
  data.population = theInputs[1].value;
  data.totalHospitalBeds = theInputs[3].value;

  // use the estimate fonction
  const myCovidEstimations = covid19ImpactEstimator(data);

  // print data in the table
  allImpactsFields.forEach((elm) => {
    const theKey = elm.id;
    elm.querySelector('.impact').innerText = myCovidEstimations.impact[theKey];
    elm.querySelector('.severeImpact').innerText = myCovidEstimations.severeImpact[theKey];
  });
}, false);
