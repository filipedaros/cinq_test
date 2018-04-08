using System.Collections.Generic;
using APM.WebApi.Models;

namespace APM.WebAPI.Models
{
    public interface IProductRepository
    {
        Product Create();
        bool Delete(int productId);
        List<Product> Retrieve();
        Product Save(int id, Product product);
        Product Save(Product product);
    }
}