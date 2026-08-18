const openDashboardButton = document.getElementById("open-dashboard");

openDashboardButton.addEventListener("click", () => {
    const dashboardUrl = browser.runtime.getURL(
        "dashboard/dashboard.html"
    );

    browser.tabs.create({
        url: dashboardUrl
    });
});