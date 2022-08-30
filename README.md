# A-COMPLETE-ONLINE-SHOP

A COMPLETE ONLINE SHOP

GROUP MEMBERS - 

Devansh Bhargava (0901MC201020)
Gandharve Solanki (0901MC201022)
Govind Kushwaha (0901MC201024)
Harsh Rajput (0901MC201026)
Soumyadeep Sinha (0901MC201064)
Udayan Singh (0901MC201065)

INTRODUCTION

E-commerce is rapidly gaining ground as an accepted and used business paradigm. More and more business houses are implementing websites providing functionality for performing commercial transactions over the web. It is reasonable to say that the process of shopping on the web is becoming common place. 

The objective of this project is to develop a general purpose e-commerce store where products can be bought from the comfort of home through the Internet. 

An online store is a virtual store on the Internet where customers can browse the catalog and select products of interest. The selected items may be collected in a shopping cart. At checkout time, the items in the shopping cart will be presented as an order. At that time, more information will be needed to complete the transaction. Usually, the customer will be asked to fill or select a billing address, a shipping address, a shipping option, and payment information.

TECH STACK

Frontend -

HTML
CSS
JAVASCRIPT - ES6

Backend - 

MONGODB
NODE - JS
EXPRESS - JS


PROJECT DESCRIPTION

Any member can register and view available products.  
Only registered members can purchase multiple products regardless of quantity. 
There are three roles available: Visitor, User and Admin. 
Visitors can view available products. 
Users can view and purchase products. 
An Admin has some extra privilege including all privileges of visitor and user.  
Admin can add products, edit product information and add/remove products.  
Admin can add users, edit user information and can remove users.  
Admin can ship orders to users based on orders placed by sending confirmation.

TABLES

USER TABLE - Since both customers and administrators are in the end users, therefore their Name, Address Email, Password and a flag variable isAdmin is stored in this table.

PRODUCT TABLE - It holds the name of a product, a short summary of the product, price of the product, the image of a product, and the description of the product.

CART TABLE - It holds the product with their quantity and the total price of the cart.
 
ORDER TABLE - It holds the information of the cart with the details of the user who had ordered the product along with the date and status of the order.







