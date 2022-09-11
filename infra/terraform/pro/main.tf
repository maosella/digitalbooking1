
variable "region" {
  description = "region infra allocated"
  type        = string
}

variable "ami" {
  description = "Amazon machine image to use for ec2 instance"
  type        = string
  default     = "ami-0917076ab9780844d" # Ubuntu 20.04 LTS // us-east-1
}





provider "aws" {
  # Configuration options
  region = "us-east-2"
}







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


################################ ROUTE TABLES #############################

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
      security_groups  = ["sg-06e8386f5269c238b"]
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
      security_groups  = ["sg-0affa1509285b363c"]
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
      security_groups  = ["sg-035701687213b6227"]
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
        "sg-035701687213b6227",
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
        "sg-06e8386f5269c238b", #cloud nine security group
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
        "sg-0e7c7cd75a9e50541",
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



################# ELASTIC LOAD BALANCER #####################

# aws_lb.doom-alb:

resource "aws_lb" "doom-alb" {

  name                       = "doom-alb"
  internal                   = false
  load_balancer_type         = "application"
  desync_mitigation_mode     = "defensive"
  security_groups            = ["sg-0affa1509285b363c"]
  subnets                    = ["subnet-08c8a04fdac3d00fb", "subnet-0e48a7b9921c034db"]
  drop_invalid_header_fields = false
  enable_deletion_protection = false
  enable_http2               = true
  enable_waf_fail_open       = false
  idle_timeout               = 60
  ip_address_type            = "ipv4"

  tags = {
    "Name" = "balancer-martinosella"
  }
  tags_all = {
    "Name" = "balancer-martinosella"
  }

}

# aws_lb_target_group.doom-alb:

resource "aws_lb_target_group" "doom-alb" {

  name                          = "doom-alb"
  vpc_id                        = aws_vpc.doom-vpc.id
  port                          = 80
  protocol                      = "HTTP"
  protocol_version              = "HTTP1"
  target_type                   = "instance"
  load_balancing_algorithm_type = "round_robin"
  deregistration_delay          = "300"
  slow_start                    = 0
  tags                          = {}
  tags_all                      = {}

  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  stickiness {
    cookie_duration = 86400
    enabled         = false
    type            = "lb_cookie"
  }
}





resource "aws_lb_listener" "external-elb" {
  load_balancer_arn = aws_lb.doom-alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.doom-alb.arn
  }
}




################launch config and autoscaling####################################



# aws_launch_configuration.doom-linuxB:
resource "aws_launch_configuration" "doom-linuxB" {

  associate_public_ip_address = false
  ebs_optimized               = false
  enable_monitoring           = false

  image_id      = "ami-0f731542a2465c17c"
  instance_type = "t2.micro"
  key_name      = "doomKey"
  name          = "doom-linuxB"
  security_groups = [
    "sg-0e7c7cd75a9e50541",
  ]
  vpc_classic_link_security_groups = []

  root_block_device {
    delete_on_termination = true
    encrypted             = false
    iops                  = 0
    throughput            = 0
    volume_size           = 8
    volume_type           = "gp2"
  }
}

# aws_autoscaling_group.doom-asg:
resource "aws_autoscaling_group" "doom-asg" {

  name                      = "doom-asg"
  max_size                  = 4
  min_size                  = 2
  desired_capacity          = 2
  health_check_grace_period = 300
  capacity_rebalance        = false
  default_cooldown          = 300
  enabled_metrics           = []
  launch_configuration      = "doom-linuxB"
  health_check_type         = "ELB"
  load_balancers            = []
  max_instance_lifetime     = 0
  metrics_granularity       = "1Minute"
  protect_from_scale_in     = false
  service_linked_role_arn   = "arn:aws:iam::145504712931:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling"

  suspended_processes = []
  target_group_arns = [
    "arn:aws:elasticloadbalancing:us-east-2:145504712931:targetgroup/doom-alb/5000c9b9bc522d04",
  ]
  termination_policies = []

  tag {
    key                 = "Name"
    propagate_at_launch = true
    value               = "doom-linuxB"
  }

  timeouts {}
}


################################ RDS #####################################

# aws_db_instance.doom-rds-mysql:

resource "aws_db_instance" "doom-rds-mysql" {

  identifier             = "doom-rds-mysql"
  allocated_storage      = 20
  max_allocated_storage  = 1000
  storage_encrypted      = true
  storage_type           = "gp2"
  db_subnet_group_name   = "doom-rds-subnet-group"
  engine                 = "mysql"
  engine_version         = "8.0.28"
  instance_class         = "db.t3.micro"
  vpc_security_group_ids = ["sg-02a9939f5eedfbe31"] #verificar
  security_group_names   = []
  publicly_accessible    = false
  port                   = 3306
  availability_zone      = "eu-north-1b"
  skip_final_snapshot    = true
  monitoring_interval    = 60

  username = "admin"
  #password                              = "password"

  multi_az                              = true
  auto_minor_version_upgrade            = true
  backup_retention_period               = 7
  copy_tags_to_snapshot                 = true
  customer_owned_ip_enabled             = false
  delete_automated_backups              = true
  deletion_protection                   = true
  enabled_cloudwatch_logs_exports       = []
  iam_database_authentication_enabled   = false
  iops                                  = 0
  backup_window                         = "04:36-05:06"
  ca_cert_identifier                    = "rds-ca-2019"
  license_model                         = "general-public-license"
  maintenance_window                    = "sun:05:53-sun:06:23"
  monitoring_role_arn                   = "arn:aws:iam::145504712931:role/rds-monitoring-role"
  option_group_name                     = "default:mysql-8-0"
  parameter_group_name                  = "default.mysql8.0"
  performance_insights_enabled          = false
  performance_insights_retention_period = 0
  tags                                  = {}
  tags_all                              = {}

  timeouts {}
}


################################ OUTPUTS ###################################



output "lb_dns_name" {
  description = "The DNS name of the load balancer"
  value       = aws_lb.doom-alb.dns_name
}


################################ s3 #########################################

# module "s3_bucket" {
#   source = "terraform-aws-modules/s3-bucket/aws"

#   bucket = "gabucket123456789"
#   acl    = "public-read"

#   versioning = {
#     enabled = true
#   }

# }
