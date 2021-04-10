// Group 3 - IT314 - Software Engineering
// Lab 9 - Question 1 : Determine Previous Date, handle all testcases

#include<iostream>
#include<string>
#include<cmath>
#include<unordered_map>
#include<unordered_set>
#include<bits/stdc++.h>
#include <sstream>
#include <fstream>
#include <string>

using namespace std;

bool IsLeap(int year)
{
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0)
                return true;
            else
                return false;
        }
        else
            return true;
    }
    else
        return false;
}


int main()
{   
    int d,m,y;
    string err="Error";
    cin>>d>>m>>y;

    // Handle Invalid Date and Year
    if(d<1 || d>31 || y > 2015 || y<1900 )
    {
        cout<<err;
        return 0;
    }
    
    // Handle Invalid Month
    if(m<1 || m>12)
    {
        cout<<err;
        return 0;
    }

    
    if(d>=1 && d<=31)
    {
        if(d==1 )
        {
            if(m==1 && y==1900)
            {
                cout<<err;
                return 0;
            }
            else if(m==1)
            {
                m=12;
                d=31;
                y--;
                cout<<d<<" "<<m<<" "<<y;
                return 0;
            }
            else if(m==3)
            {
                if(IsLeap(y))
                {
                    d=29;
                }
                else
                {
                    d=28;
                }
                m--;
                cout<<d<<" "<<m<<" "<<y;
                return 0;

            }
            else if(m==2 || m==4 || m==6 || m==8 || m==9 || m==11)
            {
                d=31;
                m--;
                cout<<d<<" "<<m<<" "<<y;
                return 0;
            }
            else
            {
                d=30;
                m--;
                cout<<d<<" "<<m<<" "<<y;
                return 0;
            }
        }
        else if(m==2)
        {
            // Handle invalid February date
            if((d>28 && IsLeap(y)==false) || (d>29 && IsLeap(y)==true) )
            {
                cout<<err;
                return 0;
            }
            else
            {
                d--;
                cout<<d<<" "<<m<<" "<<y;
                return 0;
            }
               
        }
        else
        {
            d--;
            cout<<d<<" "<<m<<" "<<y;
            return 0;
        }
        
    }

    

    return 0;
}


