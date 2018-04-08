# APM

## Pre-requisites

- Visual Studio 2013, with Web Developer Tools
- IIS Express

You will be prompted to install IIS Express when you first try to open this solution in Visual Studio. The app has been tested with Visual Studio 2013 Ultimate and Visual Studio 2013 Community Edition.

## Running the app

Once the app has been opened in Visual Studio, simply click "Start". This will open a browser with the login page displayed.

You can login using the following credentials

- Username:    abc@abc.com
- Password:    Ab_123

Any queries, problems or questions, please email ben.craig@sita.aero.

## Backlog

Implement the following backlog:

1. As an end user, I want to ensure my product code is in the correct format on the ProductEditView page. The format is three capital letters, a dash (-), followed by 4 numbers. If the user enters an incorrect format, they should be notified accordingly.

2. Remove the direct dependency on the ProductRepository class in the ProductsController using dependency injection. 

3. Ensure the ProductController is adequately unit tested. 

4. Display the currency on the ProductEditView page.

5. A European customer wants to display the product currency in euros. The value in the database is in dollars. Implement a mechanism that will handle this requirement. Consider that other currencies may be required in the future.


## Notes

- For Story 5, assume that the conversion rate between dollar and euro is 0.9 (i.e. 1 US dollar = 90 cents). The app should display the euro symbol, and the value in euros.
- If you need to, refactor any of the existing code to suit your own design.
- Feel free to add comments if required.


# Important

In order to send the solution, you should delete the following directores **before** zipping up your final solution:

- .git
- packages
- APM.WebApi\bin
- APM.WebApi\obj

If you have added any additional projects, please ensure the bin and obj directories are removed from them also.
