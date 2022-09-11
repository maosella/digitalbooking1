
# Create vpc

resource "aws_vpc" "my-vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "baseline-pre"
  }
}

##################### EIP #######################

# aws_eip.codely-dev:
resource "aws_eip" "base-pre-eip" {
  instance             = "i-0af533d622b2146bd"
  network_border_group = "us-east-2"
  network_interface    = "eni-056131cce303f340e"
  public_ipv4_pool     = "amazon"
  tags = {
    "Name" = "baseline-pre"
  }
  tags_all = {
    "Name" = "baseline-pre"
  }
  vpc = true

  timeouts {}
}


# Create Internet gateway


resource "aws_internet_gateway" "base-pre-igw" {
  vpc_id = aws_vpc.my-vpc.id

  tags = {
    Name = "baseline-pre"
  }
}

##################### SUBNETS #####################

# Create a Subnet

#Web Subnet

resource "aws_subnet" "web-subnet-1" {
  vpc_id                  = aws_vpc.my-vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-2a"
  map_public_ip_on_launch = true

  tags = {
    Name = "Web-1a"
  }
}

# App Subnet

resource "aws_subnet" "appsubnet-1" {
  vpc_id                  = aws_vpc.my-vpc.id
  cidr_block              = "10.0.11.0/24"
  availability_zone       = "us-east-2a"
  map_public_ip_on_launch = false

  tags = {
    Name = "App-1a"
  }
}

# Database Subnet

resource "aws_subnet" "dbsubnet-1" {
  vpc_id            = aws_vpc.my-vpc.id
  cidr_block        = "10.0.21.0/24"
  availability_zone = "us-east-2a"


  tags = {
    Name = "Db-1a"
  }
}

################### SECURITY GROUPS #############################

# Create Security Group 

# WebSG

resource "aws_security_group" "web-sg" {
  name        = "allow_web_traffic"
  description = "Allow Web inbound traffic"
  vpc_id      = aws_vpc.my-vpc.id

  ingress {
    description      = "HTTPS"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "HTTP"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "SSH"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "Web-SG"
  }
}


resource "aws_security_group" "webserver-sg" {
  name        = "allow_webserver_traffic"
  description = "Allow Web inbound traffic from ALB"
  vpc_id      = aws_vpc.my-vpc.id

  ingress {
    description     = "HTTPS"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.web-sg.id]
  }

  ingress {
    description     = "HTTP"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.web-sg.id]
  }

  ingress {
    description     = "SSH"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.web-sg.id]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "Webserver-SG"
  }
}

resource "aws_security_group" "db-sg" {
  name        = "allow_db_traffic"
  description = "Allow inbound traffic from application layer"
  vpc_id      = aws_vpc.my-vpc.id

  ingress {
    description     = "Allow traffic from application layer"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.webserver-sg.id]
  }

  egress {
    from_port        = 32768
    to_port          = 65535
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "DB-SG"
  }
}







# Create Custom Route Table

resource "aws_route_table" "web-rt" {
  vpc_id = aws_vpc.my-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    # gateway_id = aws_internet_gateway.gw.id
  }
}

# Associate subnet with route table

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.web-subnet-1.id
  route_table_id = aws_route_table.web-rt.id
}

# Create Ubuntu server and install/ enable apache 2 

resource "aws_instance" "web-server-1" {

  ami = "ami-0aeb7c931a5a61206"
  instance_type = "t2.micro"
  availability_zone = "us-east-2a" #Verificar que este en el mismo de la subnet
  key_name = "LOL"
  vpc_security_group_ids = [aws_security_group.webserver-sg.id]
  subnet_id              = aws_subnet.web-subnet-1.id

  
  
  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install apache2 -y 
              sudo systemctl start apache2
              sudo bash -c 'echo el web server funciona > /var/www/html/index.html' 
              EOF
  tags = {
    Name = "baseline-server-pre"
  }

}












# Create RDS instance 

resource "aws_db_instance" "base-mysql-pre" {
  allocated_storage      = 10
  db_subnet_group_name   = aws_db_subnet_group.base-mysql-pre.id
  engine                 = "mysql"
  engine_version         = "8.0.28"
  instance_class         = "db.t2.micro"
  multi_az               = true
  db_name                = "DBGrupo4C1"
  username               = "username"
  password               = "password"
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.db-sg.id]
}

resource "aws_db_subnet_group" "base-mysql-pre" {
  name       = "base-pre"
  subnet_ids = [aws_subnet.dbsubnet-1.id]

  tags = {
    Name = "DB subnetgroup"
  }
}

# Output 

# output "lb_dns_name" {
#   description = "The DNS name of the load balancer"
#   value       = aws_lb.external-elb.dns_name
# }

# Create a bucket to upload your static data like images

module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "baseline-bucket-pre"
  acl    = "public-read"

  versioning = {
    enabled = true
  }

}




