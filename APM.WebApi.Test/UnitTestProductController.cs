using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;
using APM.WebApi.Controllers;
using APM.WebApi.Models;
using APM.WebAPI.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace APM.WebApi.Test
{
    [TestClass]
    public class UnitTestProductController
    {
        //Create mock variables used in all tests
        Mock<IProductRepository> mock;
        Product newProduct = new Product { Description = "New product", Price = 10, ProductCode = "ABC-9999", ProductName = "Teste Product", ReleaseDate = DateTime.Now };
        Product existingProduct = new Product { Description = "New product", Price = 10, ProductCode = "ABC-9999", ProductId = 99, ProductName = "Teste Product", ReleaseDate = DateTime.Now };

        public UnitTestProductController()
        {
            mock = new Mock<IProductRepository>();
            mock.Setup(rep => rep.Retrieve()).Returns(new System.Collections.Generic.List<Models.Product>()
            {
                new Models.Product() { ProductId = 1, Description = "Mock product 1", Price = 10, ProductCode = "ABC-1234", ProductName = "Mock 1", ReleaseDate = DateTime.Now },
                new Models.Product() { ProductId = 2, Description = "Mock product 2", Price = 20, ProductCode = "BBC-1234", ProductName = "Mock 2", ReleaseDate = DateTime.Now },
                new Models.Product() { ProductId = 3, Description = "Mock product 3", Price = 30, ProductCode = "CBC-1234", ProductName = "Mock 3", ReleaseDate = DateTime.Now },
                new Models.Product() { ProductId = 4, Description = "Mock product 4", Price = 40, ProductCode = "DBC-1234", ProductName = "Mock 4", ReleaseDate = DateTime.Now },
            });

            mock.Setup(rep => rep.Save(newProduct))
                .Returns(existingProduct);

            mock.Setup(rep => rep.Save(99, existingProduct))
                .Returns(existingProduct);

            mock.Setup(rep => rep.Delete(1)).Returns(true);
            mock.Setup(rep => rep.Delete(0)).Returns(false);
        }

        [TestMethod]
        public void TestListProducts()
        {
            //Invoke the controller using mocked repository
            ProductsController cont = new ProductsController(mock.Object);
            var response = cont.Get();

            //Do all the necessary checks. Checking only for Ok result for brevity
            Assert.IsInstanceOfType(response, typeof(OkNegotiatedContentResult<IQueryable<Product>>));
        }

        [TestMethod]
        public void TestNewProduct()
        {
            //Invoke the controller using mocked repository
            ProductsController cont = new ProductsController(mock.Object);
            var response = cont.Post(newProduct);

            //Do all the necessary checks.
            Assert.IsInstanceOfType(response, typeof(CreatedNegotiatedContentResult<Product>));
            Assert.IsTrue(((CreatedNegotiatedContentResult<Product>)response).Content.Equals(existingProduct));
        }

        [TestMethod]
        public void TestUpdateProduct()
        {
            //Invoke the controller using mocked repository
            ProductsController cont = new ProductsController(mock.Object);
            var response = cont.Put(99, existingProduct);

            //Do all the necessary checks.
            Assert.IsInstanceOfType(response, typeof(OkResult));
        }

        [TestMethod]
        public void TestGetProduct()
        {
            int productId = 1;

            //Invoke the controller using mocked repository
            ProductsController cont = new ProductsController(mock.Object);
            var response = cont.Get(productId);

            //Do all the necessary checks.
            Assert.IsInstanceOfType(response, typeof(OkNegotiatedContentResult<Product>));
            Assert.IsTrue(((OkNegotiatedContentResult<Product>)response).Content.ProductId.Equals(productId));
        }

        [TestMethod]
        public void TestDeleteProduct()
        {
            int productId = 1;
            int invalidProductId = 0;

            //Invoke the controller using mocked repository
            ProductsController cont = new ProductsController(mock.Object);
            var responseOk = cont.Delete(productId);
            var responseNOk = cont.Delete(invalidProductId);

            //Do all the necessary checks.
            Assert.IsInstanceOfType(responseOk, typeof(OkResult));
            Assert.IsInstanceOfType(responseNOk, typeof(NotFoundResult));
        }


    }
}
