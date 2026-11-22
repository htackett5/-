#ifndef INVENTORY_H
#define INVENTORY_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NAME_LENGTH 100

typedef enum { ELECTRONICS, BOOKS, CLOTHING, OTHER } Category;

typedef struct Item {
    int id;
    char name[MAX_NAME_LENGTH];
    int quantity;
    float price;
    Category category;
    struct Item* next;
} Item;

void printMenu();
void addItem(Item** head, int* idCounter);
void viewInventory(Item* head);
void updateQuantity(Item* head);
void saveInventory(Item* head);
void loadInventory(Item** head, int* idCounter);
void freeInventory(Item* head);

#endif
