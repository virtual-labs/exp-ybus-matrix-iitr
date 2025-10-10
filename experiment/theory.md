<head>

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> 
  
</script>

</head>
 
<div style="font-family: 'Nunito Sans', sans-serif; font-size: 20px;text-align: justify;">
<h2>Introduction</h2>

The Y-Bus matrix, also known as nodal admittance matrix, is a key component in power flow analysis, providing a mathematical representation of the power systems. It is a sparse and symmetric matrix that characterizes the admittance between all pairs of connected buses in a power system. This matrix is used in solving power flow equations to determine the steady-state operating conditions of the power systems, making it a backbone for their analysis and design.<br>

###  Y-Bus Matrix Formation -

To obtain Y-Bus matrix for the interconnected power system, consider a simple network shown in Figure 1.  

<center><img src="images/Ybus1.png" style=" height: 280px" align="center"></center><br>
<center><b>Figure 1. Sample network for 5-bus power system.</b></center><br>

To obtain Y-Bus matrix for the power system, shown in Figure 1. For the Y-Bus matrix formation, all the transmission lines are represented by the π-model (please follow any of power system textbook for more details). For the current injection at each node (bus), the node-voltage equations need to be considered which are based on Kirchoff’s current law (KCL). The impedances of the transmission lines are converted to admittances as per the equation (1) given below. <br>

<center> y<sub>ij</sub> = 1/ z<sub>ij</sub> = 1/ (r<sub>ij</sub>+ x<sub>ij</sub>)   ..............................(1)</center><br>

The admittance diagram for the 5-bus power system is shown in Figure 2, where series line admittance (y<sub>ij</sub>) and half line charging susceptance (b<sub>ij</sub>) are shown. The admittance of the transformers 1 and 2 is represented by y<sub>T1</sub> and y<sub>T2</sub>, respectively. As the transformer connected between buses 1 and 2 has a tap ratio of 1:1, its series admittance is equal to the admittance of the transformer, i.e., y<sub>T1</sub> and the line charging susceptances equal to zero. Whereas the transformer connected between the buses 3 and 5 having a tap ratio of 1:t, the series admittance is equal to ' t ' times of the admittance of the transformer, i.e., ty<sub>T2</sub>, and line charging susceptances are equal to t(1-t)y<sub>T2</sub> and (1-t)y<sub>T2</sub> connected at buses 3 and 5, respectively. Now, applying KCL to the all buses, the node-voltage equations are given below.


Bus 1: I<sub>1</sub> = y<sub>T1</sub>(V<sub>1</sub> - V<sub>2</sub>)

Bus 2: I<sub>2</sub> = y<sub>T1</sub>(V<sub>2</sub> - V<sub>1</sub>) + y<sub>23</sub>(V<sub>2</sub> - V<sub>3</sub>) + y<sub>24</sub>(V<sub>2</sub> - V<sub>4</sub>) + b<sub>23</sub>V<sub>2</sub> + b<sub>24</sub>V<sub>2</sub>

Bus 3: I<sub>3</sub> = y<sub>23</sub>(V<sub>3</sub> - V<sub>2</sub>) + y<sub>34</sub>(V<sub>3</sub> - V<sub>4</sub>) + ty<sub>T2</sub>(V<sub>3</sub> - V<sub>5</sub>) + b<sub>23</sub>V<sub>3</sub> + t(t-1)y<sub>T2</sub>V<sub>3</sub> + b<sub>34</sub>V<sub>3</sub>

Bus 4: I<sub>4</sub> = y<sub>24</sub>(V<sub>4</sub> - V<sub>2</sub>) + y<sub>34</sub>(V<sub>4</sub> - V<sub>3</sub>) + (b<sub>24</sub> + b<sub>34</sub>)V<sub>4</sub>

Bus 5: I<sub>5</sub> = ty<sub>T2</sub>(V<sub>5</sub> - V<sub>3</sub>) + (1-t)y<sub>T2</sub>V<sub>5</sub>


Rearranging the terms, we get

Bus 1:  I<sub>1</sub> = y<sub>T1</sub>V<sub>1</sub> - y<sub>T1</sub>V<sub>2</sub> <br>

Bus 2: I<sub>2</sub> = -y<sub>T1</sub>V<sub>1</sub> + (y<sub>T1</sub> + b<sub>23</sub> + y<sub>23</sub> + b<sub>24</sub> + y<sub>24</sub>)V<sub>2</sub> - y<sub>23</sub>V<sub>3</sub> - y<sub>24</sub>V<sub>4</sub> <br>

Bus 3:  I<sub>3</sub> = -y<sub>23</sub>V<sub>2</sub> + (y<sub>23</sub> + b<sub>23</sub> + ty<sub>T2</sub> + t(t-1)y<sub>T2</sub> + y<sub>34</sub> + b<sub>34</sub>) V<sub>3</sub> - y<sub>34</sub>V<sub>4</sub> - ty<sub>T2</sub>V<sub>5</sub> <br>

Bus 4: I<sub>4</sub> = -y<sub>24</sub>V<sub>2</sub> - y<sub>34</sub>V<sub>3</sub> - (y<sub>24</sub> + b<sub>24</sub> + y<sub>34</sub> + b<sub>34</sub>)V<sub>4</sub> <br>

Bus 5: I<sub>5</sub> = -ty<sub>T2</sub>V<sub>3</sub> + (ty<sub>T2</sub> + (1-t)y<sub>T2</sub>)V<sub>5</sub> <br>



<center><img src="images/Ybus2.png" style=" height: 380px" align="center"></center><br>
<center><b>Figure 2. Equivalent admittance diagram of the 5-bus power system.</b></center><br>


Writing them in the matrix form as – 


<div style="text-align: center;">
  <strong></strong><br>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>I<sub>1</sub></td>
      </tr>
      <tr>
        <td>I<sub>2</sub></td>
      </tr>
      <tr>
        <td>I<sub>3</sub></td>
      </tr>
      <tr>
        <td>I<sub>4</sub></td>
      </tr>
      <tr>
        <td>I<sub>5</sub></td>
      </tr>
    </table>
  </div>
  <span>=</span>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px; margin-left: 5px; margin-right: 5px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>Y<sub>11</sub></td>
        <td>Y<sub>12</sub></td>
        <td>Y<sub>13</sub></td>
        <td>Y<sub>14</sub></td>
        <td>Y<sub>15</sub></td>
      </tr>
      <tr>
        <td>Y<sub>21</sub></td>
        <td>Y<sub>22</sub></td>
        <td>Y<sub>23</sub></td>
        <td>Y<sub>24</sub></td>
        <td>Y<sub>25</sub></td>
      </tr>
      <tr>
        <td>Y<sub>31</sub></td>
        <td>Y<sub>32</sub></td>
        <td>Y<sub>33</sub></td>
        <td>Y<sub>34</sub></td>
        <td>Y<sub>35</sub></td>
      </tr>
      <tr>
        <td>Y<sub>41</sub></td>
        <td>Y<sub>42</sub></td>
        <td>Y<sub>43</sub></td>
        <td>Y<sub>44</sub></td>
        <td>Y<sub>45</sub></td>
      </tr>
      <tr>
        <td>Y<sub>51</sub></td>
        <td>Y<sub>52</sub></td>
        <td>Y<sub>53</sub></td>
        <td>Y<sub>54</sub></td>
        <td>Y<sub>55</sub></td>
      </tr>
    </table>
  </div>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>V<sub>1</sub></td>
      </tr>
      <tr>
        <td>V<sub>2</sub></td>
      </tr>
      <tr>
        <td>V<sub>3</sub></td>
      </tr>
      <tr>
        <td>V<sub>4</sub></td>
      </tr>
      <tr>
        <td>V<sub>5</sub></td>
      </tr>
    </table>
  </div>
</div>


Where-

<p align="">
    Y<sub>11</sub>=y<sub>T1</sub>; &nbsp; Y<sub>12</sub>=Y<sub>21</sub>=-y<sub>T1</sub>; &nbsp; Y<sub>13</sub>=Y<sub>14</sub>=Y<sub>15</sub>=0 <br>
    Y<sub>22</sub>=y<sub>T1</sub>+b<sub>23</sub>+y<sub>23</sub>+b<sub>24</sub>+y<sub>24</sub>; &nbsp; Y<sub>23</sub>=-y<sub>23</sub>; &nbsp; Y<sub>24</sub>=-y<sub>24</sub>; &nbsp; Y<sub>25</sub>=0; <br>
    Y<sub>33</sub>=y<sub>23</sub>+b<sub>23</sub>+ty<sub>T2</sub>+t(t-1)y<sub>T2</sub>+y<sub>34</sub>+b<sub>34</sub>; &nbsp; Y<sub>32</sub>=-y<sub>32</sub>; &nbsp; Y<sub>34</sub>=-y<sub>34</sub>; <br>
    Y<sub>35</sub>=Y<sub>53</sub>=-ty<sub>T2</sub>; &nbsp; Y<sub>41</sub>=0; &nbsp; Y<sub>42</sub>=-y<sub>24</sub>; &nbsp; Y<sub>43</sub>=-y<sub>34</sub>; <br>
    Y<sub>44</sub>=y<sub>24</sub>+b<sub>24</sub>+y<sub>34</sub>+b<sub>34</sub>; &nbsp; Y<sub>45</sub>=Y<sub>54</sub>=0; &nbsp; Y<sub>55</sub>=ty<sub>T2</sub>+(1-t)y<sub>T2</sub>;
  </span>
</p>


Similar to this, we can generalize the Y-Bus matrix for the n-bus power system as given below.

<div style="text-align: center;">
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr><td>I<sub>1</sub></td></tr>
      <tr><td>I<sub>2</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>I<sub>i</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>I<sub>n</sub></td></tr>
    </table>
  </div>
  <span>=</span>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px; margin-left: 5px; margin-right: 5px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>Y<sub>11</sub></td>
        <td>Y<sub>12</sub></td>
        <td>...</td>
        <td>Y<sub>1i</sub></td>
        <td>...</td>
        <td>Y<sub>1n</sub></td>
      </tr>
      <tr>
        <td>Y<sub>21</sub></td>
        <td>Y<sub>22</sub></td>
        <td>...</td>
        <td>Y<sub>2i</sub></td>
        <td>...</td>
        <td>Y<sub>2n</sub></td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
      <tr>
        <td>Y<sub>i1</sub></td>
        <td>Y<sub>i2</sub></td>
        <td>...</td>
        <td>Y<sub>ii</sub></td>
        <td>...</td>
        <td>Y<sub>in</sub></td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
      <tr>
        <td>Y<sub>n1</sub></td>
        <td>Y<sub>n2</sub></td>
        <td>...</td>
        <td>Y<sub>ni</sub></td>
        <td>...</td>
        <td>Y<sub>nn</sub></td>
      </tr>
    </table>
  </div>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr><td>V<sub>1</sub></td></tr>
      <tr><td>V<sub>2</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>V<sub>i</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>V<sub>n</sub></td></tr>
    </table>
  </div>
</div>

Or,
<center>   I<sub>bus</sub> = Y<sub>bus</sub>.V<sub>bus</sub> </center><br>

Where, I<sub>bus</sub> is the vector of the injected bus currents and V<sub>bus</sub>  is the vector of bus voltages measured from the reference node. Y<sub>bus</sub> is known as the bus admittance matrix or or nodal admittance matrix.


With the above explanation, the Y<sub>bus</sub> matrix for the power system can be formulated based on the following two conditions.

### 1. For the lines, without transformer: 

•	The diagonal element of each node is the sum of admittances connected to it. It can be calculated as:

<p align="center">
  <span style="font-family: 'Times New Roman', Times, serif; font-size: 24px;">
    Y<sub>ii</sub> = 
    <span style="font-size: 30px; display: inline-block; vertical-align: middle;">
      <span style="display: block; text-align: center;">n</span>
      &sum;
      <span style="display: block; text-align: center;">j=1</span>
    </span>
    y<sub>ij</sub> + b<sub>ij</sub>
  </span>
  <span style="font-family: 'Times New Roman', sans-serif; font-size: 24px;">&nbsp;&nbsp;</span>
</p>

•	The non-diagonal elements for each node are the negative of the series admittance of the connected line. It can be calculated as:

<p align="center">
  <span style="font-family: 'Times New Roman', Times, serif; font-size: 24px;">Y<sub>ij</sub> = Y<sub>ji</sub> = -y<sub>ij</sub> , &nbsp; &forall; j &ne; i</span>
</p>



### 2. For the lines, with transformer: 

•	The diagonal element of each node is the sum of admittances connected to it. The diagonal elements for primary and secondary side of the transformer are calculated as:

For primary side bus,  
<p align="center">
  <span style="font-family: 'Times New Roman', Times, serif; font-size: 24px;">
    Y<sub>ii</sub> = 
    <span style="font-size: 30px; display: inline-block; vertical-align: middle;">
      <span style="display: block; text-align: center;">n</span>
      &sum;
      <span style="display: block; text-align: center;">j=1</span>
    </span>
    y<sub>ij</sub> + ty<sub>T</sub> + t(t-1)y<sub>T</sub> + b<sub>ij</sub>
  </span>
  <span style="font-family: 'Arial', sans-serif; font-size: 24px;">&nbsp;&nbsp; </span>
</p>

For secondary side bus,  
<p align="center">
  <span style="font-family: 'Times New Roman', Times, serif; font-size: 24px;">
    Y<sub>jj</sub> = 
    <span style="font-size: 30px; display: inline-block; vertical-align: middle;">
      <span style="display: block; text-align: center;">n</span>
      &sum;
      <span style="display: block; text-align: center;">j=1</span>
    </span>
    y<sub>ij</sub> + ty<sub>T</sub> + (1-t)y<sub>T</sub> + b<sub>ij</sub>
  </span>
  <span style="font-family: 'Arial', sans-serif; font-size: 24px;">&nbsp;&nbsp; </span>
</p>

•	The non-diagonal elements are calculated by multiplying transformer turn ratio with the negative of the series admittance of the connected line. It can be calculated as – 


<p align="center">
  <span style="font-family: 'Times New Roman', Times, serif; font-size: 24px;">Y<sub>ij</sub> = Y<sub>ji</sub> = -ty<sub>ij</sub> , &nbsp; &forall; j &ne; i</span>
</p>


The Y-Bus matrix is symmetric along the leading diagonal, due to this only upper triangular nodal admittance matrix is required improving the computational performance. Also, the Y-Bus matrix is a sparse matrix due to the interconnection of each bus with only a few nearby buses.