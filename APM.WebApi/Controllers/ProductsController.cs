using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData;
using APM.WebApi.Models;
using APM.WebAPI.Models;
using System.Web.Http.Description;
using System;

namespace APM.WebApi.Controllers
{
    public class ProductsController : ApiController
    {
        private IProductRepository _productRepository;

        public ProductsController(IProductRepository repository)
        {
            _productRepository = repository;
        }

        // GET: api/Products
        [EnableQuery()]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_productRepository.Retrieve().AsQueryable());
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [ResponseType(typeof(Product))]
        // GET: api/Products/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                Product product;

                if (id > 0)
                {
                    var products = _productRepository.Retrieve();
                    product = products.FirstOrDefault(p => p.ProductId == id);

                    if (product == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    product = _productRepository.Create();
                }

                return Ok(product);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // POST: api/Products
        public IHttpActionResult Post([FromBody]Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var newProduct = _productRepository.Save(product);

                if (newProduct == null)
                {
                    return Conflict();
                }

                var requestUri = Request == null ? new Uri("http://tests/") : Request.RequestUri;
                return Created<Product>(requestUri + newProduct.ProductId.ToString(), newProduct);

            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedProduct = _productRepository.Save(id, product);

                if (updatedProduct == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // DELETE: api/Products/5
        public IHttpActionResult Delete(int id)
        {
            bool success =_productRepository.Delete(id);

            if (success)
                return Ok();

            return NotFound();
        }
    }
}
