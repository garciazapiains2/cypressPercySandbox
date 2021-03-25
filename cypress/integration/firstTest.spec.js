// reference import is for vs will support identification of cypress methdods
/// <reference types="cypress" />

// import { find } from "cypress/types/lodash"

//describe what the test will be about
describe('Our First suite', () => {

    // 10.types of locators
    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')

        //by ID, add hash
        cy.get('#inputEmail1')

        //by class name, add dot
        cy.get('.input-full-width')

        // by attribute
        cy.get('[placeholder]')

        // by attributre name and value
        cy.get('[placeholder="Email"]')

        //find element by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and attrivute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        //find element by tag name, attribute with value and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress, create your own attributes
        cy.get('[data-cy="imputEmail1"]')

    })

    // 11.Finding web elements in the dom
    it('second test', () => {
        cy.get('[data-cy="signInButton"]')

        //only finds the first one
        cy.contains('Sign in')

        //if you want to find second one you can start with a specific attribute and value then text
        cy.contains('[status="warning"]', 'Sign in')

        //using another element sibling to go to parent then search
        cy.get('#inputEmail3')
            .parents('form')
            //find can only be used to find child elements inside of a parent
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })

    //12. Saving subject of the comman
    it('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                //using jquery
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                //if you want to use a wrap function
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })

        })
    })

    //13. Invoking commands
    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1 from previous lessons
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2 from previous lessons
        cy.get('[for="exampleInputEmail1"]').then( label=> {
            expect(label.text()).to.equal('Email address');
        })

        //3 using invoke command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            //if you would like to use jquery.....same as should above
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })

    })

    //13. Invoking commands - part 2 DATE PICKAAA

    it('invoke command part 2', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('1').click();
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 1, 2021');

    })

})

    //14. checkboxes and radio buttons
    it.only('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons =>{
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')

        })
    })

})
