

################################ VPC #####################################

# aws_vpc.doom-vpc:
resource "aws_vpc" "doom-vpc" {
  assign_generated_ipv6_cidr_block = false
  cidr_block                       = "10.0.0.0/16"
  enable_classiclink               = false
  enable_classiclink_dns_support   = false
  enable_dns_hostnames             = false
  enable_dns_support               = true
  instance_tenancy                 = "default"
  tags = {
    "Name" = "doom-vpc"
  }
  tags_all = {
    "Name" = "doom-vpc"
  }
}

##################### EIP #######################

# # aws_eip.codely-dev:
# resource "aws_eip" "codely-dev" {
#   instance             = "i-0af533d622b2146bd"
#   network_border_group = "us-east-2"
#   network_interface    = "eni-056131cce303f340e"
#   public_ipv4_pool     = "amazon"
#   tags = {
#     "Name" = "codely-dev"
#   }
#   tags_all = {
#     "Name" = "codely-dev"
#   }
#   vpc = true

#   timeouts {}
# }


################################ IGW #####################################

# aws_internet_gateway.doom-igw:
resource "aws_internet_gateway" "doom-igw" {
  vpc_id = aws_vpc.doom-vpc.id 
  tags = {
    Name = "doom-igw"
  }
}

############################## NAT GW #####################################

resource "aws_nat_gateway" "doom-nat" {
  
  subnet_id         = aws_subnet.doom-pub-2a.id
  connectivity_type = "public"
  # depends_on        = [aws_internet_gateway.doom-igw]
  tags = {
    "Name" = "doom-nat"
  }
  tags_all = {
    "Name" = "doom-nat"
  }
}


############################# ROUTE TABLES #############################

# aws_route_table.doom-pub-rt:
resource "aws_route_table" "doom-pub-rt" {
  vpc_id = aws_vpc.doom-vpc.id 
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.doom-igw.id 
  }

  tags = {
    "Name" = "doom-pub-rt"
  }
  tags_all = {
    "Name" = "doom-pub-rt"
  }
  timeouts {}
}

# aws_route_table.doom-app-rt:
resource "aws_route_table" "doom-app-rt" {
  vpc_id = aws_vpc.doom-vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = 
  }

  tags = {
    "Name" = "doom-app-rt"
  }
  tags_all = {
    "Name" = "doom-app-rt"
  }

  timeouts {}
}


# aws_route_table.doom-rds-rt:
resource "aws_route_table" "doom-rds-rt" {
  vpc_id = aws_vpc.doom-vpc.id
  route  = []
  tags = {
    "Name" = "doom-rds-rt"
  }
  tags_all = {
    "Name" = "doom-rds-rt"
  }
  timeouts {}
}

##################### SUBNETS #####################


# aws_subnet.doom-pub-2a:
resource "aws_subnet" "doom-pub-2a" {
  vpc_id                                         = aws_vpc.doom-vpc.id
  cidr_block                                     = "10.0.0.0/24"
  availability_zone                              = "eu-north-1a"
  assign_ipv6_address_on_creation                = false
  map_public_ip_on_launch                        = false
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_native                                    = false
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    "Name" = "doom-pub-2a"
  }
  tags_all = {
    "Name" = "doom-pub-2a"
  }

  timeouts {}
}


# aws_subnet.doom-pub-2b:
resource "aws_subnet" "doom-pub-2b" {
  vpc_id                                         = aws_vpc.doom-vpc.id
  cidr_block                                     = "10.0.1.0/24"
  availability_zone                              = "eu-north-1b"
  assign_ipv6_address_on_creation                = false
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    "Name" = "doom-pub-2b"
  }
  tags_all = {
    "Name" = "doom-pub-2b"
  }
  timeouts {}
}


# aws_subnet.doom-app-2a:
resource "aws_subnet" "doom-app-2a" {
  vpc_id                                         = aws_vpc.doom-vpc.id
  cidr_block                                     = "10.0.2.0/24"
  availability_zone                              = "eu-north-1a"
  assign_ipv6_address_on_creation                = false
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    "Name" = "doom-app-2a"
  }
  tags_all = {
    "Name" = "doom-app-2a"
  }
  timeouts {}
}


# aws_subnet.doom-app-2b:
resource "aws_subnet" "doom-app-2b" {
  vpc_id                                         = aws_vpc.doom-vpc.id
  cidr_block                                     = "10.0.3.0/24"
  availability_zone                              = "eu-north-1b"
  assign_ipv6_address_on_creation                = false
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    "Name" = "doom-app-2b"
  }
  tags_all = {
    "Name" = "doom-app-2b"
  }
  timeouts {}
}

# aws_subnet.doom-rds-2a:
resource "aws_subnet" "doom-rds-2a" {
  vpc_id                                         = aws_vpc.doom-vpc.id
  cidr_block                                     = "10.0.4.0/24"
  availability_zone                              = "eu-north-1a"
  assign_ipv6_address_on_creation                = false
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    "Name" = "doom-rds-2a"
  }
  tags_all = {
    "Name" = "doom-rds-2a"
  }

  timeouts {}
}


# aws_subnet.doom-rds-2b:
resource "aws_subnet" "doom-rds-2b" {
  vpc_id                                         = aws_vpc.doom-vpc.id
  cidr_block                                     = "10.0.5.0/24"
  availability_zone                              = "eu-north-1a"
  assign_ipv6_address_on_creation                = false
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    "Name" = "doom-rds-2b"
  }
  tags_all = {
    "Name" = "doom-rds-2b"
  }

  timeouts {}
}

###################### ROUTE TABLE ASSOCIATIONS ###################
# Associate subnet with route table

resource "aws_route_table_association" "doom-pub-rt-a" {
  subnet_id      = aws_subnet.doom-pub-2a.id
  route_table_id = aws_route_table.doom-pub-rt.id
}

resource "aws_route_table_association" "doom-pub-rt-b" {
  subnet_id      = aws_subnet.doom-pub-2b.id
  route_table_id = aws_route_table.doom-pub-rt.id
}

resource "aws_route_table_association" "doom-app-rt-a" {
  subnet_id      = aws_subnet.doom-app-2a.id
  route_table_id = aws_route_table.doom-app-rt.id
}

resource "aws_route_table_association" "doom-app-rt-b" {
  subnet_id      = aws_subnet.doom-app-2b.id
  route_table_id = aws_route_table.doom-app-rt.id
}

resource "aws_route_table_association" "doom-rds-rt-a" {
  subnet_id      = aws_subnet.doom-rds-2a.id
  route_table_id = aws_route_table.doom-rds-rt.id
}

resource "aws_route_table_association" "doom-rds-rt-b" {
  subnet_id      = aws_subnet.doom-rds-2b.id
  route_table_id = aws_route_table.doom-rds-rt.id
}



################### SECURITY GROUPS #############################

# aws_security_group.doom-ingress-sg:

resource "aws_security_group" "doom-ingress-sg" {
  name        = "doom-ingress-sg"
  description = "Allow Web inbound traffic"
  vpc_id      = aws_vpc.doom-vpc.id

  ingress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = "Acceso irrestricto al puerto 80"
      from_port        = 80
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 80
    },
  ]

  egress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = ""
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    },
  ]

  tags = {
    "Name" = "doom-ingress-sg"
  }
  tags_all = {
    "Name" = "doom-ingress-sg"
  }
  timeouts {}
}


# aws_security_group.doom-app-sg:

resource "aws_security_group" "doom-app-sg" {
  name        = "doom-app-sg"
  description = "doom-app-sg"
  vpc_id      = aws_vpc.doom-vpc.id

  ingress = [
    {
      cidr_blocks      = []
      description      = ""
      from_port        = 22
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []###################
      self             = false
      to_port          = 22
    },
    {
      cidr_blocks      = []
      description      = "acceso al balancer"
      from_port        = 80
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []##################
      self             = false
      to_port          = 80
    },
    {
      cidr_blocks      = []
      description      = "ssh cloud 9"
      from_port        = 22
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []######################
      self             = false
      to_port          = 22
    },
  ]
  egress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    },
  ]

  tags = {
    "Name" = "doom-app-sg"
  }
  tags_all = {
    "Name" = "doom-app-sg"
  }
  timeouts {}
}

# aws_security_group.doom-rds-sg:
resource "aws_security_group" "doom-rds-sg" {

  name        = "doom-rds-sg"
  description = "doom-rds-sg"
  vpc_id      = aws_vpc.doom-vpc.id

  ingress = [
    {
      cidr_blocks      = []
      description      = ""
      from_port        = 3306
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups = [
         ###########################################
      ]
      self    = false
      to_port = 3306
    },
    {
      cidr_blocks      = []
      description      = "Acceso desde Cloud9 para conectarse y gestionar la base de datos"
      from_port        = 3306
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups = [
         #cloud nine security group ###################################
      ]
      self    = false
      to_port = 3306
    },
    {
      cidr_blocks      = []
      description      = "Acceso desde las MV de la capa de aplicacion a la base de datos"
      from_port        = 3306
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups = [
            #############################
      ]
      self    = false
      to_port = 3306
    },
  ]

  egress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    },
  ]

  tags = {
    "Name" = "doom-rds-sg"
  }
  tags_all = {
    "Name" = "doom-rds-sg"
  }

  timeouts {}
}

# aws_security_group.doom-cloud9-sg:

resource "aws_security_group" "doom-cloud9-sg" {

  name        = "doom-cloud9-sg"
  description = "doom-cloud9-sg"
  vpc_id      = aws_vpc.doom-vpc.id

  ingress = []

  egress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    },
  ]

  tags = {
    "Name" = "doom-cloud9-sg"
  }
  tags_all = {
    "Name" = "doom-cloud9-sg"
  }

  timeouts {}
}