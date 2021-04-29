describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(teamState.teams)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/Teams");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(teamState.teams)
				.should("not.be.empty");
		});
	});

	var teams = [{ name: "Team Test A" }];

	it("display all", () => {
		cy.wait(1000);
		cy.contains("Rows per page")
			.parent("div")
			.within(() => {
				cy.get(".MuiTablePagination-select").click();
			});
		cy.get(".MuiTablePagination-menuItem").eq(3).click();
	});

	it("create new team", () => {
		cy.wrap(teams).each((team) => {
			cy.contains("Add New").click();
			cy.react("TextField", { props: { field: { name: "name" } } }).clear();
			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				team.name
			);
			cy.get("#teamForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("search for Team", () => {
		cy.wrap(teams).each((team) => {
			cy.get("#search").type(team.name);
		});
	});

	it("update the new team", () => {
		cy.wrap(teams).each((team) => {
			cy.contains(team.name)
				.parent("tr")
				.within(() => {
					cy.get("td").eq(1).get("button").eq(0).click();
				});
			cy.react("TextField", { props: { field: { name: "name" } } }).clear();
			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				team.name + " updated"
			);
			cy.get("#teamForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("delete the new team", () => {
		cy.wrap(teams).each((team) => {
			cy.contains(team.name)
				.parent("tr")
				.within(() => {
					cy.get("td").eq(1).get("button").eq(1).click();
				});
		});
		cy.get(".MuiDialogActions-root").within(() => {
			cy.get("button").eq(1).click();
		});
	});

	it("clear search for Team", () => {
		cy.get("#search").clear();
	});
});
