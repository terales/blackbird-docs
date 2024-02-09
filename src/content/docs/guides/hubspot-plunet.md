---
title: Plunet & Hubspot CRM
description: Our first introduction to solution architecting with Blackbird - let's synchronize Plunet customer/order data with Hubspot CRM!
sidebar:
  label: SA 101 - Plunet & Hubspot
  order: 2
  hidden: true
---

This guide is our first introduction to business process management and solution architecting. Now that you know how to use the basic functionality (birds, flights and apps) it is time to learn the soft skills that will help you get the most out of Blackbird!

Data synchronization between two systems is a typical Blackbird use case. Usually the requirements would be in the shape of: "When a new _x_ is created in system _y_ synchronize it to system _z_".
Today we are taking Plunet and Hubspot as example systems for this case, but of course the same methodology can be applied to any two other systems.

> Note: Throughout this article, wherever we refer to Plunet order it can be substituted by Plunet quote or Plunet request.

## 1. Requirements

As any experienced software developer will tell you: getting accurate requirements is hard. This is because in software land, everything can be precisely defined but in human language land, we tend to be a lot _"freer"_ in our descriptions of what we want to achieve. Let's take a look at a real-life example of a Blackbird user's requirement:

> "We want to synchronize Plunet orders with Hubspot deals"

This requirement is still a long way from an actual bird. So the first step is to get more details. Assuming we already know what Plunet orders and Hubspot deals are, we need to find an answer to the two most relevant questions: **What** data needs to be synchronized and **When** should this synchronization take place?

> "We want to create a deal in Hubspot when an order is created in Plunet. The deal amount, name, customer, contact person and project manager should be synchronized"

That's more like it. Whether you are implementing your own workflows in Blackbird, or you are working with someone else's requirements, you need to be able to articulate **What** needs to happen **When**. If this business process is actually already being executed "manually" on a periodic basis, then it can be extremely valuable to (digitally) sit next to this person as they do their actions. It can help finding hidden requirements, but also already give you a head start on the steps we need to take next. In all cases it is recommended that a requirement can at least be executed manually, even if it is not part of any business process today.

## 2. Relationship mapping

Now that we have a better grasp of what we need to build, we need to get some bearings on how these systems work. What is a customer in Plunet? What is an order? And most importantly: **what are the equivalent representations in Hubspot?**

Let's start with Plunet, but let's be brief:

- There are multiple customers.
- Each customer can have multiple contact persons.
- Plunet has 'internal resources' which represent people in your organization.
- There can be multiple orders, each representing business negotiated with a customer.
- A Plunet order is linked to an 'internal resource' as project manager, a customer and a contact person of that customer.

![Plunet diagram](../../../assets/guides/hubspot-plunet/plunet-diagram.png)

In Hubspot, thinks look similar but with a significant difference:

- There are multiple companies
- There are multiple contacts
- There are multiple deals. A deal has a 'deal owner' who is a Hubspot user
- Between these three entities, many-to-many relationships exist. And Hubspot uses 'associations' to keep track of these relationships.

![Hubspot diagram](../../../assets/guides/hubspot-plunet/hubspot-diagram.png)

These structures are similar enough to create a mapping between the two. However, in some cases these similarities don't exist. In those cases it is prudent to investigate how people have mapped these relationships in their organization.

Let's draw the semantic relationship map:

![Hubspot Plunet](../../../assets/guides/hubspot-plunet/hubspot-plunet.png)

## 3. Implementating the relationships

Whenever we are dealing with semantic relationships, we also need to make them explicit. We are doing this so later down the line we can easily have answers to questions of the form **"I have entity _x_, how do I now get entity _y_?"**. For example, we know that we will have actions within one system to get certain relationships. Given a Plunet order I can easily get the project manager. Given a Hubspot company I can easily get the contacts. These relationships and actions come out of the box! But how should we map the implicit relationships we just defined? Given that I have a Plunet order, how do I get the equivalent company _in Hubspot_?

Luckily, both Plunet and Hubspot allow us to create and set custom fields for each of these entities.

For Plunet, we create a _text module_ and apply it to Customers, internal resources, and orders. For more information on text modules, check out the [Plunet documentation](https://kb.plunet.com/display/KB/Text+modules).

![Plunet text module](../../../assets/guides/hubspot-plunet/plunet-text-module.png)
