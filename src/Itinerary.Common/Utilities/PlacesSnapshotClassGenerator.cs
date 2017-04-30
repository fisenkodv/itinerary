using System.Collections.Generic;
using System.Linq;
using Itinerary.Common.Models;
using Itinerary.Common.Models.Comparers;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Location = Itinerary.Common.Models.Location;

namespace Itinerary.Common.Utilities
{
  public class PlacesSnapshotClassGenerator
  {
    public static string GenerateClass( IEnumerable<PlaceDetails> places )
    {
      places = places.Distinct( new PlaceEqualityComparer() );
      return GenerateClassInternal( places );
    }

    private static string GenerateClassInternal( IEnumerable<PlaceDetails> placeDetails )
    {
      NamespaceDeclarationSyntax @namespace =
        SyntaxFactory.NamespaceDeclaration(
                       SyntaxFactory.ParseName(
                         "Itinerary.DataAccess.EntityFramework.Extensions" ) )
                     .NormalizeWhitespace();

      @namespace = @namespace.AddUsings( SyntaxFactory.UsingDirective( SyntaxFactory.ParseName( "System" ) ) );
      @namespace = @namespace.AddUsings( SyntaxFactory.UsingDirective( SyntaxFactory.ParseName( "System.Linq" ) ) );
      @namespace = @namespace.AddUsings(
        SyntaxFactory.UsingDirective( SyntaxFactory.ParseName( "System.Collections.Generic" ) ) );
      @namespace = @namespace.AddUsings(
        SyntaxFactory.UsingDirective( SyntaxFactory.ParseName( "Itinerary.Common.Models" ) ) );

      ClassDeclarationSyntax classDeclaration = SyntaxFactory.ClassDeclaration( "PlacesSnapshot" );
      classDeclaration = classDeclaration.AddModifiers( SyntaxFactory.Token( SyntaxKind.InternalKeyword ) );

      VariableDeclarationSyntax placesVariableDeclaration =
        SyntaxFactory.VariableDeclaration( SyntaxFactory.ParseTypeName( "List<PlaceDetails>" ) );

      VariableDeclaratorSyntax placesVariableDeclarator =
        SyntaxFactory
          .VariableDeclarator( SyntaxFactory.Identifier( "places" ) )
          .WithInitializer(
            SyntaxFactory.EqualsValueClause(
              SyntaxFactory.ObjectCreationExpression( SyntaxFactory.ParseTypeName( "List<PlaceDetails>" ) )
                           .WithArgumentList( SyntaxFactory.ArgumentList() ) ) );

      LocalDeclarationStatementSyntax placesLocalVariable =
        SyntaxFactory.LocalDeclarationStatement( placesVariableDeclaration.AddVariables( placesVariableDeclarator ) );

      IEnumerable<ExpressionStatementSyntax> addPlaceToListInvocations =
        from place in placeDetails
        let expressionStatement = SyntaxFactory.ExpressionStatement(
          SyntaxFactory.InvocationExpression
          (
            SyntaxFactory.MemberAccessExpression
            (
              SyntaxKind.SimpleMemberAccessExpression,
              SyntaxFactory.IdentifierName( "places" ),
              SyntaxFactory.IdentifierName( "Add" )
            )
          ).AddArgumentListArguments( CreatePlaceCreationExpression( place ) ) )
        select expressionStatement;

      var statements = new List<StatementSyntax> { placesLocalVariable };
      statements.AddRange( addPlaceToListInvocations.ToList() );
      statements.Add( SyntaxFactory.ReturnStatement( SyntaxFactory.IdentifierName( "places" ) ) );

      PropertyDeclarationSyntax propertyDeclaration = SyntaxFactory
        .PropertyDeclaration( SyntaxFactory.ParseTypeName( "IEnumerable<PlaceDetails>" ), "Places" )
        .AddModifiers( SyntaxFactory.Token( SyntaxKind.PublicKeyword ) )
        .AddAccessorListAccessors(
          SyntaxFactory
            .AccessorDeclaration( SyntaxKind.GetAccessorDeclaration )
            .WithBody( SyntaxFactory.Block( statements ) ) );

      classDeclaration = classDeclaration.AddMembers( propertyDeclaration );

      @namespace = @namespace.AddMembers( classDeclaration );

      string code = @namespace
        .NormalizeWhitespace()
        .ToFullString();

      return code;
    }

    private static ArgumentSyntax CreatePlaceCreationExpression( PlaceDetails placeDetails )
    {
      ObjectCreationExpressionSyntax objectCreationExpression =
        SyntaxFactory.ObjectCreationExpression( SyntaxFactory.IdentifierName( "PlaceDetails" ) );

      var arguments =
        new[]
        {
          SyntaxFactory.Argument(
            SyntaxFactory.LiteralExpression(
              SyntaxKind.StringLiteralExpression, SyntaxFactory.Literal( placeDetails.Name ) ) ),
          SyntaxFactory.Argument(
            SyntaxFactory.LiteralExpression(
              SyntaxKind.NumericLiteralExpression, SyntaxFactory.Literal( placeDetails.Rating ) ) ),
          SyntaxFactory.Argument(
            SyntaxFactory.LiteralExpression(
              SyntaxKind.NumericLiteralExpression, SyntaxFactory.Literal( placeDetails.Reviews ) ) ),
          CreateCategoryArgument( placeDetails.Categories ),
          SyntaxFactory.Argument(
            SyntaxFactory.LiteralExpression(
              SyntaxKind.StringLiteralExpression, SyntaxFactory.Literal( placeDetails.Url ) ) ),
          SyntaxFactory.Argument(
            SyntaxFactory.LiteralExpression(
              SyntaxKind.StringLiteralExpression, SyntaxFactory.Literal( placeDetails.ImgUrl ) ) ),
          CreateLocationArgument( placeDetails.Location )
        };

      objectCreationExpression = objectCreationExpression.AddArgumentListArguments( arguments );
      return SyntaxFactory.Argument( objectCreationExpression );
    }

    private static ArgumentSyntax CreateCategoryArgument( IEnumerable<string> categories )
    {
      InitializerExpressionSyntax arrayInitializer =
        SyntaxFactory.InitializerExpression( SyntaxKind.ArrayInitializerExpression );

      arrayInitializer = categories.Aggregate(
        arrayInitializer,
        ( current, category ) => current.AddExpressions(
          SyntaxFactory.LiteralExpression(
            SyntaxKind.StringLiteralExpression, SyntaxFactory.Literal( category ) ) ) );

      ArrayCreationExpressionSyntax arrayCreation =
        SyntaxFactory.ArrayCreationExpression(
          SyntaxFactory.ArrayType( SyntaxFactory.ParseTypeName( "string[]" ) ), arrayInitializer );

      return SyntaxFactory.Argument( arrayCreation );
    }

    private static ArgumentSyntax CreateLocationArgument( Location location )
    {
      ArgumentSyntax latArgument = SyntaxFactory.Argument(
        SyntaxFactory.LiteralExpression(
          SyntaxKind.NumericLiteralExpression,
          SyntaxFactory.Literal( location.Latitude ) ) );

      ArgumentSyntax lngArgument = SyntaxFactory.Argument(
        SyntaxFactory.LiteralExpression(
          SyntaxKind.NumericLiteralExpression,
          SyntaxFactory.Literal( location.Longitude ) ) );

      ObjectCreationExpressionSyntax objectCreation = SyntaxFactory
        .ObjectCreationExpression( SyntaxFactory.IdentifierName( "Location" ) );
      objectCreation = objectCreation.AddArgumentListArguments( latArgument, lngArgument );

      ArgumentSyntax locationArgument = SyntaxFactory.Argument( objectCreation );

      return locationArgument;
    }
  }
}
