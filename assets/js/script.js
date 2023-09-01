let weeksContainer = document.querySelectorAll(".weekly__container");

function showWeeklyData() {
    for( letsingleClass of weeksContainer){
        letsingleClass.style.display = "flex";
    }
}

function showDailyData() {
    for (letsingleClass of weeksContainer) {
        letsingleClass.style.display = "none";
    }
}